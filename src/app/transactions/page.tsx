"use client";
import AddTransaction, {
  type Transaction,
} from "@/components/AddTransaction";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const transactions = [
  { id: 1, name: "Monthly Salary", category: "Income", date: "2026-11-08", amount: 3500, type: "income" },
  { id: 2, name: "Netflix Subscription", category: "Entertainment", date: "2026-11-07", amount: 15, type: "expense" },
  { id: 3, name: "Shopping", category: "Shopping", date: "2026-11-06", amount: 120, type: "expense" },
  { id: 4, name: "Freelance Project", category: "Income", date: "2026-11-05", amount: 450, type: "income" },
  { id: 5, name: "Restaurant", category: "Food", date: "2026-11-04", amount: 65, type: "expense" },
  { id: 6, name: "Electricity Bill", category: "Utilities", date: "2026-11-03", amount: 85, type: "expense" },
  { id: 7, name: "Online Course", category: "Education", date: "2026-11-02", amount: 200, type: "expense" },
  { id: 8, name: "Freelance Payment", category: "Income", date: "2026-11-01", amount: 600, type: "income" },
  { id: 9, name: "Transportation", category: "Transport", date: "2026-10-30", amount: 40, type: "expense" },
  { id: 10, name: "Project Bonus", category: "Income", date: "2026-10-28", amount: 300, type: "income" },
];

const ITEMS_PER_PAGE = 5;

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const filteredTransactions = allTransactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.name.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || transaction.type === filter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const displayedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="min-w-0 flex-1 bg-slate-50 p-6 md:p-8">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
  <div>
    <h1 className="text-3xl font-bold text-slate-900">
      Transactions
    </h1>
    <p className="mt-2 text-slate-500">
      Manage and track all your financial activities.
    </p>
  </div>

  <button
    onClick={() => setShowForm(true)}
    className="rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
  >
    + Add Transaction
  </button>
</header>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 md:max-w-sm"
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={filter}
                onChange={(event) => {
                  setFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm"
              >
                <option value="all">All transactions</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
              </select>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highest">Highest amount</option>
                <option value="lowest">Lowest amount</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase text-slate-400">
                  <th className="pb-4 font-medium">Transaction</th>
                  <th className="pb-4 font-medium">Category</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 text-right font-medium">Amount</th>
                </tr>
              </thead>

              <tbody>
                {displayedTransactions.length > 0 ? (
                  displayedTransactions.map((transaction) => (
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
                        {new Date(transaction.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </td>

                      <td
                        className={`py-5 text-right text-sm font-semibold ${
                          transaction.type === "income"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
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

          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row">
            <p className="text-sm text-slate-500">
              Showing {filteredTransactions.length === 0 ? 0 : startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredTransactions.length)}{" "}
              of {filteredTransactions.length} transactions
            </p>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="flex items-center px-3 text-sm font-medium">
                {totalPages === 0 ? 0 : currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages || totalPages === 0}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}