"use client";

import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/transactionStore";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Period = "Weekly" | "Monthly" | "Yearly";

export default function AnalyticsChart() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  const [period, setPeriod] = useState<Period>("Yearly");
  const [todayTimestamp, setTodayTimestamp] = useState<number | null>(null);

  useEffect(() => {
    setTodayTimestamp(Date.now());
  }, []);

  const referenceDate = todayTimestamp ? new Date(todayTimestamp) : null;

  const chartData = (() => {
    if (!referenceDate) {
      return [];
    }

    const groups: Record<
      string,
      { income: number; expenses: number }
    > = {};

    transactions.forEach((transaction) => {
      const [year, month, day] = transaction.date
        .split("-")
        .map(Number);

      const date = new Date(year, month - 1, day);

      let label = "";

      if (period === "Weekly") {
        const difference = Math.floor(
          (
            new Date(
              referenceDate.getFullYear(),
              referenceDate.getMonth(),
              referenceDate.getDate()
            ).getTime() -
            date.getTime()
          ) /
            (1000 * 60 * 60 * 24)
        );

        if (difference < 0 || difference >= 7) return;

        label = date.toLocaleDateString("en-US", {
          weekday: "short",
        });
      } else if (period === "Monthly") {
        if (
          date.getFullYear() !== referenceDate.getFullYear() ||
          date.getMonth() !== referenceDate.getMonth()
        ) {
          return;
        }

        label = `Week ${Math.ceil(day / 7)}`;
      } else {
        label = date.toLocaleDateString("en-US", {
          month: "short",
        });
      }

      if (!groups[label]) {
        groups[label] = { income: 0, expenses: 0 };
      }

      if (transaction.type === "income") {
        groups[label].income += transaction.amount;
      } else {
        groups[label].expenses += transaction.amount;
      }
    });

    return Object.entries(groups).map(([month, values]) => ({
      month,
      ...values,
    }));
  })();

  const totalIncome = chartData.reduce(
    (total, item) => total + item.income,
    0
  );

  const totalExpenses = chartData.reduce(
    (total, item) => total + item.expenses,
    0
  );

  const netSavings = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Financial Analytics
          </h2>
          <p className="text-sm text-slate-500">
            Track your income and expenses.
          </p>
        </div>

        <div className="flex gap-2">
          {(["Weekly", "Monthly", "Yearly"] as Period[]).map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                period === item
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-emerald-50 p-4">
          <p className="text-sm text-slate-500">Total Income</p>
          <h3 className="mt-2 text-xl font-bold text-emerald-600">
            {formatCurrency(totalIncome)}
          </h3>
        </div>

        <div className="rounded-xl bg-rose-50 p-4">
          <p className="text-sm text-slate-500">Total Expenses</p>
          <h3 className="mt-2 text-xl font-bold text-rose-600">
            {formatCurrency(totalExpenses)}
          </h3>
        </div>

        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-slate-500">Net Savings</p>
          <h3 className="mt-2 text-xl font-bold text-blue-600">
            {formatCurrency(netSavings)}
          </h3>
        </div>
      </div>

      <div className="h-80 w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="income"
                name="Income"
                fill="#10b981"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#f43f5e"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No transaction data available for this period.
          </div>
        )}
      </div>
    </section>
  );
}