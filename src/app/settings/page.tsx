"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import Sidebar from "@/components/Sidebar";
import { useSettingsStore } from "@/store/settingsStore";

export default function SettingsPage() {
  const savedName = useSettingsStore((state) => state.name);
  const savedEmail = useSettingsStore((state) => state.email);
  const savedCurrency = useSettingsStore((state) => state.currency);
  const hasHydrated = useSettingsStore((state) => state.hasHydrated);

  const updateProfile = useSettingsStore(
    (state) => state.updateProfile
  );

  const updateCurrency = useSettingsStore(
    (state) => state.updateCurrency
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasHydrated) {
      setName(savedName);
      setEmail(savedEmail);
      setCurrency(savedCurrency);
    }
  }, [hasHydrated, savedName, savedEmail, savedCurrency]);

  function handleSaveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage("Please enter your name and email address.");
      return;
    }

    updateProfile(name.trim(), email.trim());
    setMessage("Profile updated successfully!");

    setTimeout(() => setMessage(""), 3000);
  }

  function handleSaveCurrency() {
    updateCurrency(currency);
    setMessage("Currency preference saved!");

    setTimeout(() => setMessage(""), 3000);
  }

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50/40">
        <p className="text-sm text-blue-800">
          Loading your settings...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="min-w-0 flex-1 bg-blue-50/40 p-6 pt-24 md:p-8 md:pt-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">
            Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your profile and application preferences.
          </p>
        </header>

        {message && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-medium text-blue-800"
          >
            {message}
          </div>
        )}

        {/* Profile Settings */}
        <section className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-950">
              Profile Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your personal information.
            </p>
          </div>

          <form onSubmit={handleSaveProfile}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-blue-950"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-blue-100 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-blue-950"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-blue-100 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Save Profile
            </button>
          </form>
        </section>

        {/* Currency Settings */}
        <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-950">
              Currency Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose the currency used to display your financial information.
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="currency"
              className="mb-2 block text-sm font-medium text-blue-950"
            >
              Preferred Currency
            </label>

            <select
              id="currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="w-full rounded-xl border border-blue-100 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:max-w-sm"
            >
              <option value="USD">US Dollar (USD)</option>
              <option value="ETB">Ethiopian Birr (ETB)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
            </select>
          </div>

          <button
            onClick={handleSaveCurrency}
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Save Currency
          </button>

          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Currency selection changes the display preference, not the
            underlying transaction amounts or exchange rates.
          </p>
        </section>
      </main>
    </div>
  );
}