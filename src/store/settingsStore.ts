import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SettingsStore = {
  name: string;
  email: string;
  currency: string;
  updateProfile: (name: string, email: string) => void;
  updateCurrency: (currency: string) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      name: "FinFlow User",
      email: "user@example.com",
      currency: "USD",

      updateProfile: (name, email) => set({ name, email }),

      updateCurrency: (currency) => set({ currency }),
    }),
    {
      name: "finflow-settings",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);