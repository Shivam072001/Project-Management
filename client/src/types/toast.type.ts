import type { ToastProps, ToastActionElement } from "@/components/ui/toast";

export enum ToastActionType {
  ADD_TOAST = "ADD_TOAST",
  UPDATE_TOAST = "UPDATE_TOAST",
  DISMISS_TOAST = "DISMISS_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST",
}

export interface ToasterToast extends ToastProps {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: ToastActionElement;
}

export type ToastAction =
  | { type: ToastActionType.ADD_TOAST; toast: ToasterToast }
  | { type: ToastActionType.UPDATE_TOAST; toast: Partial<ToasterToast> }
  | { type: ToastActionType.DISMISS_TOAST; toastId?: string }
  | { type: ToastActionType.REMOVE_TOAST; toastId?: string };

export interface ToastState {
  toasts: ToasterToast[];
}
