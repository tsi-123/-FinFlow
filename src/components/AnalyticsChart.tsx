"use client";

import { useState } from "react";
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

const chartData = {
  Weekly: [
    { month: "Mon", income: 500, expenses: 200 },
    { month: "Tue", income: 700, expenses: 350 },
    { month: "Wed", income: 400, expenses: 250 },
    { month: "Thu", income: 900, expenses: 400 },
    { month: "Fri", income: 650, expenses: 300 },
    { month: "Sat", income: 800, expenses: 450 },
    { month: "Sun", income: 600, expenses: 250 },
  ],
  Monthly: [
    { month: "Week 1", income: 1800, expenses: 900 },
    { month: "Week 2", income: 2200, expenses: 1100 },
    { month: "Week 3", income: 1500, expenses: 800 },
    { month: "Week 4", income: 2700, expenses: 1300 },
  ],
  Yearly: [
    { month: "Jan", income: 4500, expenses: 2800 },
    { month: "Feb", income: 5200, expenses: 3100 },
    { month: "Mar", income: 4800, expenses: 2600 },
    { month: "Apr", income: 6100, expenses: 3500 },
    { month: "May", income: 5500, expenses: 2900 },
    { month: "Jun", income: 7200, expenses: 3800 },
    { month: "Jul", income: 6800, expenses: 3200 },
    { month: "Aug", income: 7500, expenses: 4100 },
    { month: "Sep", income: 6200, expenses: 3000 },
    { month: "Oct", income: 8100, expenses: 4200 },
    { month: "Nov", income: 7900, expenses: 3900 },
    { month: "Dec", income: 9000, expenses: 4500 },
  ],
};

type Period = keyof typeof chartData;

export default function AnalyticsChart() {
  const [period, setPeriod] = useState<Period>("Yearly");
  const currentData = chartData[period];

const totalIncome = currentData.reduce(
  (total, item) => total + item.income,
  0
);

const totalExpenses = currentData.reduce(
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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData} barGap={8}>
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
      </div>
    </section>
  );
}