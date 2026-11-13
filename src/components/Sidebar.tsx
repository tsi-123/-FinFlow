"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: "▦" },
  { name: "Transactions", href: "/transactions", icon: "⇄" },
  { name: "Analytics", href: "/analytics", icon: "▥" },
  { name: "Settings", href: "/settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const navigationLinks = (
    <nav className="flex-1">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Menu
      </p>

      <div className="space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
              isActive(item.href)
                ? "bg-emerald-500 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile navigation header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-slate-950 px-5 py-4 text-white md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 font-bold">
            F
          </div>
          <h1 className="text-xl font-bold">FinFlow</h1>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-xl hover:bg-slate-800"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-[65px] z-50 flex w-64 flex-col bg-slate-950 px-5 py-7 text-white transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navigationLinks}

        <div className="border-t border-slate-800 pt-5">
          <p className="text-sm font-medium">Welcome back!</p>
          <p className="mt-1 text-xs text-slate-400">
            Manage your money wisely.
          </p>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 flex-col bg-slate-950 px-5 py-7 text-white md:flex">
        <div className="mb-12 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-xl font-bold">
            F
          </div>
          <h1 className="text-2xl font-bold tracking-tight">FinFlow</h1>
        </div>

        {navigationLinks}

        <div className="border-t border-slate-800 pt-5">
          <p className="text-sm font-medium">Welcome back!</p>
          <p className="mt-1 text-xs text-slate-400">
            Manage your money wisely.
          </p>
        </div>
      </aside>
    </>
  );
}