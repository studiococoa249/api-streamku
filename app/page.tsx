"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const apiCards = [
  { label: "Movies", endpoint: "/api/v1/movies", detail: "Data film, cover, trailer, genre, dan stream URL" },
  { label: "Drama", endpoint: "/api/v1/drama", detail: "Drama terbaru dengan episode dan detail konten" },
  { label: "Short Drama", endpoint: "/api/v1/short-drama", detail: "Konten pendek dengan list episode cepat" },
  { label: "Anime", endpoint: "/api/v1/anime", detail: "Anime populer dengan info episode dan stream link" },
];

const features = [
  "REST API modern",
  "Streaming URL JSON",
  "Response format cepat",
  "API key support",
  "Rate limit & quota",
  "Premium content access",
];

const endpoints = [
  { method: "GET", route: "/api/v1/movies", desc: "List semua film" },
  { method: "GET", route: "/api/v1/movie/:id", desc: "Detail film beserta URL stream" },
  { method: "GET", route: "/api/v1/drama", desc: "Daftar drama aktif" },
  { method: "GET", route: "/api/v1/drama/:id/episodes", desc: "Episode per drama" },
  { method: "GET", route: "/api/v1/anime", desc: "List anime update" },
  { method: "GET", route: "/api/v1/short-drama", desc: "Short drama terbaru" },
];

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("/api/v1/user");
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsLoggedIn(false);
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-lg font-extrabold text-white shadow-lg shadow-red-500/40">
              D
            </div>
            <div>
              <p className="font-display text-xl font-bold tracking-wide">DB Movie API</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#home" className="transition hover:text-white">Home</a>
            <a href="#api" className="transition hover:text-white">API</a>
            <a href="#endpoints" className="transition hover:text-white">Endpoints</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            {!loading && isLoggedIn ? (
              <>
                <Link href="/dashboard" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-500">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:border-red-500 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:border-red-500 hover:text-white">
                  Login
                </Link>
                <Link href="/auth/register" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-500">
                  Register
                </Link>
              </>
            )}
          </div>
        </header>

        <section id="home" className="relative overflow-hidden rounded-[32px] border border-red-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.28),_transparent_26%),linear-gradient(135deg,#121316_0%,#17181d_45%,#0d0d10_100%)] p-6 shadow-2xl shadow-red-950/40 sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                Streaming API Provider
              </span>
              <h1 className="mt-5 max-w-xl font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                API streaming untuk film, drama, short drama, anime, dan konten premium.
              </h1>
              <p className="mt-4 max-w-lg text-base text-zinc-300 sm:text-lg">
                DB Movie API menyediakan data konten, metadata, episode, dan link stream untuk kebutuhan aplikasi OTT, website, dan layanan video digital Anda.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="#api" className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-500">
                  Explore API
                </Link>
                <Link href="/auth/register" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-red-500 hover:bg-red-500/10">
                  Get API Key
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-8 text-sm text-zinc-300">
                <div>
                  <p className="text-2xl font-bold text-white">24K+</p>
                  <span>Media Assets</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">99.9%</p>
                  <span>Uptime</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">4.9/5</p>
                  <span>Developer Rating</span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -left-8 top-6 h-40 w-40 rounded-full bg-red-500/30 blur-3xl" />
              <div className="absolute -right-6 bottom-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#17181d]/80 p-4 shadow-2xl">
                <div className="rounded-2xl border border-red-500/20 bg-[#0d0d12] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">
                      API Status
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                      Online
                    </span>
                  </div>

                  <div className="space-y-3 rounded-xl bg-white/3 p-3">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Base URL</span>
                      <span className="text-zinc-200">https://api.dbmovie.com</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Format</span>
                      <span className="text-zinc-200">JSON / REST</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Auth</span>
                      <span className="text-zinc-200">API Key</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-white/10 bg-[#101216] p-3 font-mono text-xs text-red-300">
                    curl -H "Authorization: Bearer YOUR_KEY" \n  https://api.dbmovie.com/api/v1/movies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="api" className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Supported Catalogs</h2>
            <span className="text-sm text-red-400">Multi-category API</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {apiCards.map((card) => (
              <article key={card.label} className="rounded-2xl border border-white/10 bg-[#111318] p-5 transition hover:border-red-500/40 hover:-translate-y-1">
                <p className="text-xs uppercase tracking-[0.25em] text-red-300">{card.label}</p>
                <h3 className="mt-3 text-lg font-bold text-white">{card.endpoint}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{card.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#111318] p-5 sm:p-6">
            <h2 className="font-display text-2xl font-bold text-white">Why developers choose DB Movie API</h2>
            <ul className="mt-5 space-y-3">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-zinc-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#111318] p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-white">Example Response</h2>
              <span className="text-sm text-red-400">JSON</span>
            </div>
            <pre className="overflow-x-auto rounded-2xl border border-red-500/20 bg-[#0d0d12] p-4 text-xs leading-6 text-zinc-200">
{`{
  "status": true,
  "data": {
    "id": "mv_1024",
    "movie_name": "Silent Horizon",
    "genre": ["Action", "Sci-Fi"],
    "year": 2025,
    "cover_image_url": "https://...",
    "trailer_url": "https://...",
    "stream_url_1": "https://.../stream.mp4"
  }
}`}
            </pre>
          </div>
        </section>

        <section id="endpoints" className="mt-12 rounded-[28px] border border-white/10 bg-[#111318] p-5 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-white">Core Endpoints</h2>
            <span className="text-sm text-red-400">Public & premium</span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-[90px_1fr_1.8fr] border-b border-white/10 bg-white/3 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
              <span>Method</span>
              <span>Route</span>
              <span>Description</span>
            </div>
            {endpoints.map((item) => (
              <div key={item.route} className="grid grid-cols-[90px_1fr_1.8fr] border-b border-white/10 px-4 py-4 text-sm text-zinc-200 last:border-b-0">
                <span className="font-semibold text-red-300">{item.method}</span>
                <span className="font-mono text-zinc-200">{item.route}</span>
                <span className="text-zinc-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-12 rounded-[28px] border border-red-500/20 bg-gradient-to-r from-red-600/20 via-[#111318] to-[#111318] p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-red-300">API Access</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white">Mulai dari akses developer hingga premium plan.</h2>
            </div>
            <Link href="/auth/register" className="inline-flex rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-500">
              Get API Key
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
