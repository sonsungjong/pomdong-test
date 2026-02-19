"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  CircleHelp,
  FolderOpen,
  Play,
  Plus,
  Search,
  Settings,
  UserRound,
} from "lucide-react";

interface AppShellProps {
  children: ReactNode;
}

function stepsForPath(pathname: string): { steps: string[]; active: number } {
  if (pathname.startsWith("/dashboard")) {
    return {
      steps: ["1 Default Settings", "2 Simulation Settings", "3 Dash Board"],
      active: 2,
    };
  }

  if (pathname.startsWith("/subgroups")) {
    return {
      steps: [
        "1 Filter Patients",
        "2 Patients Summary",
        "3 Subgroups Set Selection",
        "4 Subgroup Explain",
        "5 Report",
      ],
      active: 2,
    };
  }

  return {
    steps: ["1 Study Design Optimization", "2 Report"],
    active: 0,
  };
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { steps, active } = stepsForPath(pathname);

  // Helper to check active state for sidebar icons
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="flex min-h-screen bg-[#EBEBEC]">
      {/* 
        Sidebar (Transparent / No Background)
        Icons aligned to the top. No enclosing border.
      */}
      <aside className="w-[68px] flex flex-col items-center py-4 gap-8">

        {/* Top: Logo */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-500 transition-colors"
        >
          <Play size={18} fill="white" className="ml-1" />
        </button>

        {/* Nav Icons */}
        <div className="flex flex-col gap-4 w-full items-center">
          <NavIcon
            onClick={() => router.push("/subgroups")}
            active={isActive("/subgroups")}
            icon={<FolderOpen size={20} />}
            label="Subgroups"
          />
          <NavIcon
            onClick={() => router.push("/dashboard")}
            active={isActive("/dashboard")}
            icon={<Search size={20} />}
            label="Search"
          />
          <NavIcon
            icon={<Plus size={20} />}
            label="Add"
          />
        </div>

        {/* Bottom: Settings/Profile */}
        <div className="flex flex-col gap-4 items-center mt-auto">
          <NavIcon icon={<Settings size={20} />} label="Settings" />
          <button className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold text-xs hover:scale-105 transition-transform border border-indigo-200">
            <UserRound size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 p-3 pl-0">
        <header className="h-14 flex items-center justify-between mb-2">
          <nav className="flex flex-wrap items-center gap-2" aria-label="steps">
            {steps.map((step, index) => {
              // Extract number and text (e.g., "1 Filter Patients" -> "1", "Filter Patients")
              const [num, ...textParts] = step.split(" ");
              const label = textParts.join(" ");
              const isActiveStep = index === active;

              return (
                <span
                  key={step}
                  className={`flex items-center text-sm font-semibold gap-2 ${isActiveStep ? "text-[#1E1b4B]" : "text-gray-400"
                    }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-1 ${isActiveStep
                      ? "bg-[#1E1B4B] text-white ring-[#1E1B4B]"
                      : "bg-white text-gray-400 ring-gray-300"
                    }`}>
                    {num}
                  </span>
                  <span>{label}</span>

                  {index < steps.length - 1 ? (
                    <ChevronRight size={14} className="mx-2 text-gray-300" />
                  ) : null}
                </span>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <HeaderBtn icon={<ArrowLeft size={18} />} />
            <HeaderBtn icon={<CircleHelp size={18} />} />
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function NavIcon({ active, icon, onClick, label }: { active?: boolean; icon: ReactNode; onClick?: () => void, label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 group ${active
        ? "bg-white text-indigo-900 shadow-md scale-105"
        : "text-gray-500 hover:text-indigo-600 hover:bg-black/5"
        }`}
      aria-label={label}
    >
      {icon}
      {active && <div className="absolute -left-2 w-1 h-5 bg-indigo-600 rounded-r-full" />}
    </button>
  );
}

function HeaderBtn({ icon }: { icon: ReactNode }) {
  return (
    <button type="button" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
      {icon}
    </button>
  )
}
