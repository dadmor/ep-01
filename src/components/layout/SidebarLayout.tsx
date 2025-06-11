// src/components/layout/SidebarLayout.tsx
import React from "react";
import { User } from "lucide-react";
import { UserRole } from "@/hooks/useAuth";

interface SidebarLayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
  menuComponent?: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  userRole = "operator",
  menuComponent,
}) => {
  return (
    <div className="drawer lg:drawer-open min-h-[90vh]">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile menu button */}
        <div className="navbar lg:hidden bg-base-100">
          <div className="flex-none">
            <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">Panel</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="card bg-base-100 shadow-xl h-full">
            <div className="card-body p-0 h-full">{children}</div>
          </div>
        </div>
      </div>

      {/* Drawer Side */}
      <div className="drawer-side">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
        <aside className="w-80 min-h-full bg-base-100">
          <div className="p-6">
          <img className="w-42" src="/assets/smart-edi-play-logo.svg" alt="Logo"  />
            {/* User Profile Section */}
            <div className="flex items-center gap-3 mb-8 mt-26  ">
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-12">
                  <User className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-base-content capitalize text-lg">
                  {userRole}
                </h2>
                <p className="text-sm text-base-content/70">
                  Panel Użytkownika
                </p>
              </div>
            </div>

           

            {/* Menu Component */}
            <div className="menu-container">{menuComponent}</div>
          </div>
        </aside>
      </div>
    </div>
  );
};
