import React from "react";

/**
 * Lightweight Drawer (right-side) with overlay.
 * Controlled via `open` + `onOpenChange`.
 *
 * Exports:
 * - Drawer
 * - DrawerContent
 * - DrawerHeader
 * - DrawerTitle
 * - DrawerFooter
 */

export function Drawer({
  children,
  open = false,
  onOpenChange = () => {},
  placement = "right",
}) {
  // Render nothing when closed to avoid multiple overlays in the DOM.
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="presentation">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* panel */}
      <div
        className={`relative h-full w-full sm:w-[480px] bg-background shadow-lg ${
          placement === "left" ? "mr-auto" : "ml-auto"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}

export function DrawerContent({ children, className = "" }) {
  return <div className={`h-full flex flex-col ${className}`}>{children}</div>;
}

export function DrawerHeader({ children, className = "" }) {
  return <div className={`px-6 py-4 border-b ${className}`}>{children}</div>;
}

export function DrawerTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function DrawerFooter({ children, className = "" }) {
  return (
    <div className={`px-6 py-4 border-t flex justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
}
