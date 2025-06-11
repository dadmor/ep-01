// src/pages/student/menu.TeacherMenu.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Users,
  FileText,
  Shield,
  MessageSquare,
  Store,
  PlusCircle,
  Briefcase,
  FolderOpen,
  ClipboardList,
  Phone,
  UserCheck,
  Home,
  BookOpen,
  TrendingUp,
  Trophy,
} from "lucide-react";

export interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const menuItems = {
  teacher: [
    { path: "/teeacher/lessons", label: "Lekcje", icon: Home },
    { path: "/teeacher/students", label: "Studenci", icon: BookOpen },
  ],
} as const;

export type UserRole = keyof typeof menuItems;

interface SidebarMenuProps {
  userRole: UserRole;
}

export const TeacherMenu: React.FC<SidebarMenuProps> = ({ userRole }) => {
  const currentMenuItems = menuItems[userRole] || [];

  return (
    <nav className="space-y-2">
      {currentMenuItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
};
