import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/", icon: "▦" },
  { name: "Transactions", href: "/transactions", icon: "⇄" },
  { name: "Analytics", href: "/analytics", icon: "▥" },
  { name: "Settings", href: "/settings", icon: "⚙" },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-950 px-5 py-7 text-white">

      {/* Logo */}
      <div className="mb-12 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-xl font-bold">
          F
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          FinFlow
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>

        <div className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                item.name === "Dashboard"
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

      {/* Bottom section */}
      <div className="border-t border-slate-800 pt-5">
        <p className="text-sm font-medium">Welcome back!</p>
        <p className="mt-1 text-xs text-slate-400">Manage your money wisely.</p>
      </div>

    </aside>
  );
}