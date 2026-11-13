"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useSettingsStore } from "@/store/settingsStore";

export default function SettingsPage() {
  const savedName = useSettingsStore((state) => state.name);
  const savedEmail = useSettingsStore((state) => state.email);
  const savedCurrency = useSettingsStore((state) => state.currency);

  const updateProfile = useSettingsStore(
    (state) => state.updateProfile
  );

  const updateCurrency = useSettingsStore(
    (state) => state.updateCurrency
  );

  const [name, setName] = useState(savedName);
  const [email, setEmail] = useState(savedEmail);
  const [currency, setCurrency] = useState(savedCurrency);
  const [message, setMessage] = useState("");

  function handleSaveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
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

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="min-w-0 flex-1 bg-slate-50 p-6 pt-24 md:p-8 md:pt-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your profile and application preferences.
          </p>
        </header>

        {message && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
            {message}
          </div>
        )}

        {/* Profile Settings */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Profile Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your personal information.
            </p>
          </div>

          <form onSubmit={handleSaveProfile}>
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Save Profile
            </button>
          </form>
        </section>

        {/* Currency Settings */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Currency Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose the currency used to display your financial information.
            </p>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Preferred Currency
            </label>

            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 md:max-w-sm"
            >
              <option value="USD">US Dollar (USD)</option>
              <option value="ETB">Ethiopian Birr (ETB)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
            </select>
          </div>

          <button
            onClick={handleSaveCurrency}
            className="rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Save Currency
          </button>

          <p className="mt-4 text-xs text-slate-400">
            Currency selection changes the display preference, not the
            underlying transaction amounts or exchange rates.
          </p>
        </section>
      </main>
    </div>
  );
}
