import { Request, Response } from "express";

import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  changeRoleSchema,
  createWorkspaceSchema,
  workspaceIdSchema,
} from "../validation/workspace.validation";
import { HTTPSTATUS } from "../config/http.config";
import {
  changeMemberRoleService,
  createWorkspaceService,
  deleteWorkspaceService,
  getAllWorkspacesUserIsMemberService,
  getWorkspaceAnalyticsService,
  getWorkspaceByIdService,
  getWorkspaceMembersService,
  updateWorkspaceByIdService,
} from "../services/workspace.service";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { Permissions } from "../enums/role.enum";
import { roleGuard } from "../utils/roleGuard";
import { updateWorkspaceSchema } from "../validation/workspace.validation";
import { WorkspaceDocument } from "@/models/workspace.model";
import { RoleType } from "../enums/role.enum";
import { MemberDocument } from "@/models/member.model";
import { AnalyticsType } from "../models/workspace.model";

export const createWorkspaceController = asyncHandler(async (req: Request, res: Response) => {
  const body = createWorkspaceSchema.parse(req.body);

  const userId = req.user?._id as string;
  const { workspace } = (await createWorkspaceService(userId, body)) as {
    workspace: WorkspaceDocument;
  };

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Workspace created successfully",
    workspace,
  });
});

// Controller: Get all workspaces the user is part of

export const getAllWorkspacesUserIsMemberController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id as string;

    const { workspaces } = (await getAllWorkspacesUserIsMemberService(userId)) as {
      workspaces: WorkspaceDocument[];
    };

    return res.status(HTTPSTATUS.OK).json({
      message: "User workspaces fetched successfully",
      workspaces,
    });
  }
);

export const getWorkspaceByIdController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user?._id as string;

  await getMemberRoleInWorkspace(userId, workspaceId);

  const { workspace } = (await getWorkspaceByIdService(workspaceId)) as {
    workspace: WorkspaceDocument;
  };

  return res.status(HTTPSTATUS.OK).json({
    message: "Workspace fetched successfully",
    workspace,
  });
});

export const getWorkspaceMembersController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user?._id as string;

  const { role } = (await getMemberRoleInWorkspace(userId, workspaceId)) as { role: RoleType };
  roleGuard(role, [Permissions.VIEW_ONLY]);

  const { members, roles } = (await getWorkspaceMembersService(workspaceId)) as {
    members: MemberDocument[];
    roles: RoleType[];
  };

  return res.status(HTTPSTATUS.OK).json({
    message: "Workspace members retrieved successfully",
    members,
    roles,
  });
});

export const getWorkspaceAnalyticsController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user?._id as string;

  const { role } = (await getMemberRoleInWorkspace(userId, workspaceId)) as { role: RoleType };
  roleGuard(role, [Permissions.VIEW_ONLY]);

  const { analytics } = (await getWorkspaceAnalyticsService(workspaceId)) as {
    analytics: AnalyticsType;
  };

  return res.status(HTTPSTATUS.OK).json({
    message: "Workspace analytics retrieved successfully",
    analytics,
  });
});

export const changeWorkspaceMemberRoleController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const { memberId, roleId } = changeRoleSchema.parse(req.body);

    const userId = req.user?._id as string;

    const { role } = (await getMemberRoleInWorkspace(userId, workspaceId)) as { role: RoleType };
    roleGuard(role, [Permissions.CHANGE_MEMBER_ROLE]);

    const { member } = (await changeMemberRoleService(workspaceId, memberId, roleId)) as {
      member: MemberDocument;
    };

    return res.status(HTTPSTATUS.OK).json({
      message: "Member Role changed successfully",
      member,
    });
  }
);

export const updateWorkspaceByIdController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const { name, description } = updateWorkspaceSchema.parse(req.body);

  const userId = req.user?._id as string;

  const { role } = (await getMemberRoleInWorkspace(userId, workspaceId)) as { role: RoleType };
  roleGuard(role, [Permissions.EDIT_WORKSPACE]);

  const { workspace } = (await updateWorkspaceByIdService(workspaceId, name, description)) as {
    workspace: WorkspaceDocument;
  };

  return res.status(HTTPSTATUS.OK).json({
    message: "Workspace updated successfully",
    workspace,
  });
});

export const deleteWorkspaceByIdController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);

  const userId = req.user?._id as string;

  const { role } = (await getMemberRoleInWorkspace(userId, workspaceId)) as { role: RoleType };
  roleGuard(role, [Permissions.DELETE_WORKSPACE]);

  const { currentWorkspace } = (await deleteWorkspaceService(workspaceId, userId)) as {
    currentWorkspace: WorkspaceDocument;
  };

  return res.status(HTTPSTATUS.OK).json({
    message: "Workspace deleted successfully",
    currentWorkspace,
  });
});
