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
    <section className="mt-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-blue-950">
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
                  ? "bg-blue-700 text-white shadow-sm"
                  : "bg-blue-50 text-blue-900 hover:bg-blue-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
          <p className="text-sm text-blue-800">Total Income</p>
          <h3 className="mt-2 text-xl font-bold text-blue-700">
            {formatCurrency(totalIncome)}
          </h3>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-100/70 p-3">
          <p className="text-sm text-blue-900">Total Expenses</p>
          <h3 className="mt-2 text-xl font-bold text-blue-800">
            {formatCurrency(totalExpenses)}
          </h3>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3">
          <p className="text-sm text-blue-800">Net Savings</p>
          <h3 className="mt-2 text-xl font-bold text-blue-950">
            {formatCurrency(netSavings)}
          </h3>
        </div>
      </div>

      <div className="h-64 w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={8}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#dbeafe"
              />

              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#dbeafe" }}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #dbeafe",
                  backgroundColor: "#ffffff",
                }}
                formatter={(value) => formatCurrency(Number(value))}
              />

              <Legend />

              <Bar
                dataKey="income"
                name="Income"
                fill="#60a5fa"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#1e40af"
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