import "dotenv/config";
import mongoose from "mongoose";
import connectDatabase from "../config/database.config";
import RoleModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/role-permission";
import { logger } from "../utils/logger";

const seedRoles = async (): Promise<void> => {
  logger.debug("Seeding roles started...");

  try {
    await connectDatabase();

    const session = await mongoose.startSession();
    session.startTransaction();

    logger.debug("Clearing existing roles...");
    await RoleModel.deleteMany({}, { session });

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      // Check if the role already exists
      const existingRole = await RoleModel.findOne({ name: role }).session(session);
      if (!existingRole) {
        const newRole = new RoleModel({
          name: role,
          permissions: permissions,
        });
        await newRole.save({ session });
        logger.info(`Role ${role} added with permissions.`);
      } else {
        logger.error(`Role ${role} already exists.`);
      }
    }

    await session.commitTransaction();
    logger.debug("Transaction committed.");

    session.endSession();
    logger.info("Session ended.");

    logger.info("Seeding completed successfully.");
  } catch (error) {
    logger.error("Error during seeding:", error);
  }
};

seedRoles().catch((error) => logger.error("Error running seed script:", error));
