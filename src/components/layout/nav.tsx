"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Workflow, Play, History, Heart, FileText, LayoutDashboard, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/run", label: "Run", icon: Play },
  { href: "/history", label: "History", icon: History },
  { href: "/health", label: "Health", icon: Heart },
  { href: "/export", label: "Export", icon: FileText },
];

export function Nav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-1.5">
            <Workflow className="h-4 w-4 text-white" />
          </div>
          <span className="hidden sm:inline">Workflow Builder Lite</span>
        </Link>
        <nav className="ml-8 flex flex-1 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname === "/" && item.href === "/dashboard");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-200"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
