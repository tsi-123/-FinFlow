"use client";

import { useState } from "react";

const transactions = [
  {
    id: 1,
    name: "Salary",
    category: "Monthly salary",
    date: "Nov 08, 2026",
    amount: "+$3,500.00",
    type: "income",
  },
  {
    id: 2,
    name: "Netflix",
    category: "Entertainment",
    date: "Nov 07, 2026",
    amount: "-$15.00",
    type: "expense",
  },
  {
    id: 3,
    name: "Shopping",
    category: "Shopping",
    date: "Nov 06, 2026",
    amount: "-$120.00",
    type: "expense",
  },
  {
    id: 4,
    name: "Freelance Project",
    category: "Additional income",
    date: "Nov 05, 2026",
    amount: "+$450.00",
    type: "income",
  },
];

export default function RecentTransactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || transaction.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Section heading */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Recent Transactions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your latest financial activities.
        </p>
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 sm:flex-1"
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
        >
          <option value="all">All transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>

      </div>

      {/* Transactions table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">

          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase text-slate-400">
              <th className="pb-4 font-medium">Name</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="py-5 text-sm font-semibold text-slate-800">
                    {transaction.name}
                  </td>

                  <td className="py-5 text-sm text-slate-500">
                    {transaction.category}
                  </td>

                  <td className="py-5 text-sm text-slate-500">
                    {transaction.date}
                  </td>

                  <td
                    className={`py-5 text-right text-sm font-semibold ${
                      transaction.type === "income"
                        ? "text-emerald-600"
                        : "text-slate-800"
                    }`}
                  >
                    {transaction.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Showing {filteredTransactions.length} of {transactions.length} transactions
      </p>

    </section>
  );
}