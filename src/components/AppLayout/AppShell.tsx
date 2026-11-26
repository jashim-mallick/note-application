"use client";

import { useState } from "react";
import PrivateHeader from "../Header/PrivateHeader";
import { SessionNavBar } from "../Ui/SideBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <div className="flex h-screen">
      <SessionNavBar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {!isSidebarCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/40 sm:hidden"
          onClick={() => setIsSidebarCollapsed(true)}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-1 flex-col overflow-auto">
        <PrivateHeader
          onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className="mx-auto max-w-7xl px-1 py-3 sm:px-3 md:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
