"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

interface ToastIconProps {
  type: ToastType;
}

const ToastIcon: React.FC<ToastIconProps> = ({ type }) => {
  const iconClasses = {
    success: "text-teal-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  const icons = {
    success: (
      <CheckCircle
        className={cn("shrink-0 size-4 mt-0.5", iconClasses[type])}
      />
    ),
    error: (
      <XCircle className={cn("shrink-0 size-4 mt-0.5", iconClasses[type])} />
    ),
    warning: (
      <AlertTriangle
        className={cn("shrink-0 size-4 mt-0.5", iconClasses[type])}
      />
    ),
    info: <Info className={cn("shrink-0 size-4 mt-0.5", iconClasses[type])} />,
  };

  return icons[type];
};

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 5000,
  className,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-[100]",
        "max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg",
        "animate-in slide-in-from-top-2 fade-in duration-300",
        className
      )}
      role="alert"
      tabIndex={-1}
    >
      <div className="flex p-4">
        <div className="shrink-0">
          <ToastIcon type={type} />
        </div>
        <div className="ms-3">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        {onClose && (
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
