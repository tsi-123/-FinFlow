"use client";

import { useState } from "react";
import AddTransaction, {
  type Transaction,
} from "@/components/AddTransaction";

import { useTransactionStore } from "@/store/transactionStore";

export default function RecentTransactions() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction
  );

  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = [...transactions]
    .filter((transaction) => {
      const matchesSearch =
        transaction.name.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || transaction.type === filter;

      return matchesSearch && matchesFilter;
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction);
  }

  function handleSaveEdit(updatedTransaction: Transaction) {
    updateTransaction(updatedTransaction.id, updatedTransaction);
    setEditingTransaction(null);
  }

  function handleDelete(id: number, name: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (confirmed) {
      deleteTransaction(id);
    }
  }

  return (
    <>
      <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-950">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest financial activities.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-blue-100 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:flex-1"
          />

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border border-blue-100 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b border-blue-100 text-xs uppercase text-slate-400">
                <th className="pb-4 font-medium">Name</th>
                <th className="pb-4 font-medium">Category</th>
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 text-right font-medium">Amount</th>
                <th className="pb-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-blue-50 transition-colors hover:bg-blue-50/40 last:border-0"
                  >
                    <td className="py-5 text-sm font-semibold text-blue-950">
                      {transaction.name}
                    </td>

                    <td className="py-5 text-sm text-slate-500">
                      {transaction.category}
                    </td>

                    <td className="py-5 text-sm text-slate-500">
                      {new Date(transaction.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        }
                      )}
                    </td>

                    <td
                      className={`py-5 text-right text-sm font-semibold ${
                        transaction.type === "income"
                          ? "text-blue-500"
                          : "text-blue-900"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>

                    <td className="py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="text-sm font-medium text-blue-600 transition hover:text-blue-900"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(transaction.id, transaction.name)
                          }
                          className="text-sm font-medium text-blue-800 transition hover:text-blue-950"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
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
          Showing {filteredTransactions.length} recent transactions
        </p>
      </section>

      {editingTransaction && (
        <AddTransaction
          initialTransaction={editingTransaction}
          onSave={handleSaveEdit}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </>
  );
}