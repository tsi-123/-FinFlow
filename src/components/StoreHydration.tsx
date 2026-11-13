"use client";

import { useEffect } from "react";
import { useTransactionStore } from "@/store/transactionStore";
import { useSettingsStore } from "@/store/settingsStore";

export default function StoreHydration() {
  useEffect(() => {
    useTransactionStore.persist.rehydrate();
    useSettingsStore.persist.rehydrate();
  }, []);

  return null;
}