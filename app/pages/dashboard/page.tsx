"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  email: string;
  level: string;
  status: string;
}

interface DashboardCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const cards: DashboardCard[] = [
  {
    title: "Account",
    description: "Manage your profile, username, and password",
    icon: "👤",
    href: "/account",
    color: "from-blue-600 to-blue-700",
  },
  {
    title: "API Keys",
    description: "Generate and manage your API keys",
    icon: "🔑",
    href: "/api-keys",
    color: "from-purple-600 to-purple-700",
  },
  {
    title: "Documentation",
    description: "API documentation and integration guide",
    icon: "📚",
    href: "/docs",
    color: "from-green-600 to-green-700",
  },
  {
    title: "Plans",
    description: "View pricing and upgrade your plan",
    icon: "💳",
    href: "/plan",
    color: "from-yellow-600 to-yellow-700",
  },
  {
    title: "Billing History",
    description: "Check your payment history and invoices",
    icon: "📋",
    href: "/history-plan",
    color: "from-pink-600 to-pink-700",
  },
  {
    title: "Navigation Menu",
    description: "Create and manage navigation menu items",
    icon: "☰",
    href: "/menu",
    color: "from-orange-600 to-orange-700",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/v1/user");
        if (response.status === 401) {
          router.push("/auth/login");
          return;
        }
        const result = await response.json();
        if (result.status) {
          setUser(result.data);
        } else {
          setError(result.error || "Failed to fetch user data");
        }
      } catch (err) {
        setError("Error loading user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-zinc-400">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-red-400">Error: {error || "User not found"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-red-300">Welcome back</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">
            Dashboard, {user.username}
          </h1>
          <p className="mt-2 text-zinc-400">{user.email}</p>
        </div>

        <div className="mb-10 grid gap-4 rounded-[28px] border border-white/10 bg-[#111318] p-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Account Status</p>
            <p className="mt-2 text-lg font-bold text-white">{user.status}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Account Level</p>
            <p className="mt-2 text-lg font-bold text-white">{user.level}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-white">Quick Access</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-[28px] border border-white/10 bg-[#111318] p-6 transition hover:border-red-500/40 hover:-translate-y-1"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${card.color} text-2xl`}>
                {card.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-white">{card.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{card.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-400">
                Open
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
