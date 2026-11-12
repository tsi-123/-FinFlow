import { create } from "zustand";
import type { Transaction } from "@/components/AddTransaction";

const initialTransactions: Transaction[] = [
  {
    id: 1,
    name: "Monthly Salary",
    category: "Income",
    date: "2026-11-08",
    amount: 3500,
    type: "income",
  },
  {
    id: 2,
    name: "Netflix Subscription",
    category: "Entertainment",
    date: "2026-11-07",
    amount: 15,
    type: "expense",
  },
  {
    id: 3,
    name: "Shopping",
    category: "Shopping",
    date: "2026-11-06",
    amount: 120,
    type: "expense",
  },
  {
    id: 4,
    name: "Freelance Project",
    category: "Income",
    date: "2026-11-05",
    amount: 450,
    type: "income",
  },
  {
    id: 5,
    name: "Restaurant",
    category: "Food",
    date: "2026-11-04",
    amount: 65,
    type: "expense",
  },
  {
    id: 6,
    name: "Electricity Bill",
    category: "Utilities",
    date: "2026-11-03",
    amount: 85,
    type: "expense",
  },
  {
    id: 7,
    name: "Online Course",
    category: "Education",
    date: "2026-11-02",
    amount: 200,
    type: "expense",
  },
  {
    id: 8,
    name: "Freelance Payment",
    category: "Income",
    date: "2026-11-01",
    amount: 600,
    type: "income",
  },
  {
    id: 9,
    name: "Transportation",
    category: "Transport",
    date: "2026-10-30",
    amount: 40,
    type: "expense",
  },
  {
    id: 10,
    name: "Project Bonus",
    category: "Income",
    date: "2026-10-28",
    amount: 300,
    type: "income",
  },
];

type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: initialTransactions,

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
}));