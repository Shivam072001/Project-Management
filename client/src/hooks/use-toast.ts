"use client";

import * as React from "react";
import { TOAST_LIMIT, TOAST_REMOVE_DELAY } from "@/constant";
import { ToastAction, ToastActionType, ToasterToast, ToastState } from "@/types/toast.type";

// Custom event emitter implementation
class ToastEventEmitter {
  private listeners: ((action: ToastAction) => void)[] = [];

  emit(_event: "toast", action: ToastAction) {
    this.listeners.forEach((listener) => listener(action));
  }

  on(_event: "toast", callback: (action: ToastAction) => void) {
    this.listeners.push(callback);
  }

  off(_event: "toast", callback: (action: ToastAction) => void) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }
}

const toastEmitter = new ToastEventEmitter();

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case ToastActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case ToastActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case ToastActionType.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId || !action.toastId ? { ...t, open: false } : t,
        ),
      };

    case ToastActionType.REMOVE_TOAST:
      return {
        ...state,
        toasts: action.toastId ? state.toasts.filter((t) => t.id !== action.toastId) : [],
      };

    default:
      return state;
  }
};

// Custom hook to manage toast state
export function useToast() {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] });

  React.useEffect(() => {
    const handleEvent = (action: ToastAction) => dispatch(action);
    toastEmitter.on("toast", handleEvent);

    return () => {
      toastEmitter.off("toast", handleEvent);
    };
  }, []);

  return {
    ...state,
    toast: (toast: Omit<ToasterToast, "id">) => {
      const id = crypto.randomUUID();
      toastEmitter.emit("toast", {
        type: ToastActionType.ADD_TOAST,
        toast: { ...toast, id, open: true },
      });

      setTimeout(() => {
        toastEmitter.emit("toast", { type: ToastActionType.DISMISS_TOAST, toastId: id });
      }, TOAST_REMOVE_DELAY);

      return {
        id,
        dismiss: () =>
          toastEmitter.emit("toast", { type: ToastActionType.DISMISS_TOAST, toastId: id }),
        update: (updatedToast: Partial<ToasterToast>) =>
          toastEmitter.emit("toast", {
            type: ToastActionType.UPDATE_TOAST,
            toast: { ...updatedToast, id },
          }),
      };
    },
    dismiss: (toastId?: string) => {
      toastEmitter.emit("toast", { type: ToastActionType.DISMISS_TOAST, toastId });
    },
  };
}
