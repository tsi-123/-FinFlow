import Sidebar from "@/components/Sidebar";
import OverviewCards from "@/components/OverviewCards";
import RecentTransactions from "@/components/RecentTransactions";
import AnalyticsChart from "@/components/AnalyticsChart";

export default function Home() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="min-w-0 flex-1 p-6 pt-24 md:p-8 md:pt-8">

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's an overview of your finances.
          </p>
        </header>

        <OverviewCards />
        <AnalyticsChart />
        <RecentTransactions />

      </main>

    </div>
  );
}