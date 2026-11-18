import Sidebar from "@/components/Sidebar";
import OverviewCards from "@/components/OverviewCards";
import RecentTransactions from "@/components/RecentTransactions";
import AnalyticsChart from "@/components/AnalyticsChart";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-blue-50/40">
      <Sidebar />

      <main className="min-w-0 flex-1 p-5 pt-24 md:p-8 md:pt-8">
        {/* Welcome Banner */}
        <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-blue-800 to-blue-700 p-7 text-white shadow-lg md:p-9">
          {/* Decorative circles */}
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-white/5" />

          <div className="relative z-10 max-w-xl">
            <p className="mb-3 text-sm font-medium text-blue-200">
              YOUR FINANCIAL SPACE
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to FinFlow.
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-blue-100 md:text-base">
              Take a moment to understand your money, track your spending,
              and stay on top of your financial goals.
            </p>
          </div>

          <div className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-50 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-blue-300" />
            Your finances at a glance
          </div>
        </section>

        <div className="space-y-8">
          {/* Financial Overview */}
          <section>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-blue-950">
                Financial Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A quick look at your income, expenses, and balance.
              </p>
            </div>

            <OverviewCards />
          </section>

          {/* Analytics */}
          <section>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-blue-950">
                Your Financial Activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Understand how your money moves over time.
              </p>
            </div>

            <AnalyticsChart />
          </section>

          {/* Recent Transactions */}
          <section>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-blue-950">
                Recent Activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep track of your latest transactions.
              </p>
            </div>

            <RecentTransactions />
          </section>
        </div>
      </main>
    </div>
  );
}