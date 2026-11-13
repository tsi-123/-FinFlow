"use client";

import { useState } from "react";

export type Transaction = {
  id: number;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
};

type AddTransactionProps = {
  onSave: (transaction: Transaction) => void;
  onClose: () => void;
  initialTransaction?: Transaction;
};

export default function AddTransaction({
  onSave,
  onClose,
  initialTransaction,
}: AddTransactionProps) {
  const [name, setName] = useState(initialTransaction?.name ?? "");
  const [category, setCategory] = useState(
    initialTransaction?.category ?? "Other"
  );
  const [amount, setAmount] = useState(
    initialTransaction?.amount.toString() ?? ""
  );
  const [type, setType] = useState<"income" | "expense">(
    initialTransaction?.type ?? "expense"
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (
      !name.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return;
    }

    const now = new Date();
    const localDate = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    onSave({
      id: initialTransaction?.id ?? Date.now(),
      name: name.trim(),
      category,
      date: initialTransaction?.date ?? localDate,
      amount: numericAmount,
      type,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {initialTransaction ? "Edit Transaction" : "Add Transaction"}
          </h2>

          <button type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <label className="mb-2 block text-sm font-medium">
          Transaction name
        </label>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Monthly salary"
          className="mb-4 w-full rounded-lg border border-slate-200 p-3 text-sm"
        />

        <label className="mb-2 block text-sm font-medium">Amount ($)</label>
        <input
          required
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="0.00"
          className="mb-4 w-full rounded-lg border border-slate-200 p-3 text-sm"
        />

        <label className="mb-2 block text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-200 p-3 text-sm"
        >
          <option>Other</option>
          <option>Salary</option>
          <option>Food</option>
          <option>Shopping</option>
          <option>Transport</option>
          <option>Entertainment</option>
          <option>Education</option>
          <option>Utilities</option>
        </select>

        <label className="mb-2 block text-sm font-medium">
          Transaction type
        </label>
        <select
          value={type}
          onChange={(event) =>
            setType(event.target.value as "income" | "expense")
          }
          className="mb-6 w-full rounded-lg border border-slate-200 p-3 text-sm"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-200 py-3 text-sm font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            {initialTransaction ? "Save Changes" : "Save Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
}