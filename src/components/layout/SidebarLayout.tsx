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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-96 bg-white flex-shrink-0">
        <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 capitalize">
                  {userRole}
                </h2>
                <p className="text-sm text-slate-600">Panel Użytkownika</p>
              </div>
            </div>

            {menuComponent}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="w-full h-8 bg-white"></div>
        <div className="rounded-xl shadow-xl overflow-hidden">{children}</div>
      </div>
    </div>
  );
};