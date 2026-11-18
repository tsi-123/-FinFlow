"use client";

import { useTransactionStore } from "@/store/transactionStore";

export default function OverviewCards() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const overviewData = [
    {
      title: "Total Balance",
      amount: totalBalance,
      color: "text-blue-950",
      accent: "bg-blue-950",
    },
    {
      title: "Total Income",
      amount: totalIncome,
      color: "text-blue-600",
      accent: "bg-blue-600",
    },
    {
      title: "Total Expenses",
      amount: totalExpenses,
      color: "text-blue-400",
      accent: "bg-blue-400",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {overviewData.map((item) => (
        <div
          key={item.title}
          className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className={`absolute left-0 top-0 h-full w-1 ${item.accent}`} />

          <p className="text-sm font-medium text-slate-500">
            {item.title}
          </p>

          <h2 className={`mt-3 text-2xl font-bold ${item.color}`}>
            {formatCurrency(item.amount)}
          </h2>

          <p className="mt-4 text-xs text-slate-400">
            Calculated from your transactions
          </p>
        </div>
      ))}
    </section>
  );
}