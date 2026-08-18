"use client";

import { useEffect, useState } from "react";
import type { MembershipPlan } from "@/app/generated/prisma/client";

export default function PlanPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/v1/plans");
        const result = await response.json();
        if (result.status) {
          setPlans(result.data);
        } else {
          setError(result.error || "Failed to fetch plans");
        }
      } catch (err) {
        setError("Error loading plans");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-zinc-400">Loading plans...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-red-400">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-red-300">Membership</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">Plans</h1>
        </div>

        {plans.length === 0 ? (
          <p className="text-center text-zinc-400">No plans available yet.</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-[28px] border border-white/10 bg-[#111318] p-6"
              >
                <h2 className="font-display text-2xl font-bold text-white">{plan.name}</h2>
                <p className="mt-4 text-4xl font-black text-white">
                  Rp {Number(plan.priceIdr).toLocaleString("id-ID")}
                </p>

                <ul className="mt-5 space-y-3 text-sm text-zinc-200">
                  <li className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                      ✓
                    </span>
                    {plan.requestLimit.toLocaleString()} requests/bulan
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                      ✓
                    </span>
                    {(plan.bandwithLimitPerDay / 1024).toFixed(2)} GB/hari
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                      ✓
                    </span>
                    {plan.expired} hari akses
                  </li>
                </ul>

                <button className="mt-6 w-full rounded-2xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500">
                  Checkout Plan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
