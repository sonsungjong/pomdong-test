"use client";

import type { ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Drawer({ open, title, children, onClose }: DrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <>
      <button type="button" className="drawer-backdrop" aria-label="상세 패널 닫기" onClick={onClose} />
      <aside className="ui-drawer glass-panel" role="dialog" aria-modal="true" aria-label={title}>
        <header className="ui-modal-header">
          <h4>{title}</h4>
          <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={onClose}>
            닫기
          </button>
        </header>
        <div className="ui-modal-body">{children}</div>
      </aside>
    </>
  );
}

