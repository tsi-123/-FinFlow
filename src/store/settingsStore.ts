import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SettingsStore = {
  name: string;
  email: string;
  currency: string;
  hasHydrated: boolean;

  updateProfile: (name: string, email: string) => void;
  updateCurrency: (currency: string) => void;
  setHasHydrated: (value: boolean) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      currency: "USD",
      hasHydrated: false,

      updateProfile: (name, email) => set({ name, email }),

      updateCurrency: (currency) => set({ currency }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "finflow-settings",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,

      partialize: (state) => ({
        name: state.name,
        email: state.email,
        currency: state.currency,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);