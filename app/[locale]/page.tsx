"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { 
  PlayCircleIcon, 
  CodeBracketIcon, 
  SparklesIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  CpuChipIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const apiCards = [
    { label: t("catalog.movies.label"), icon: <PlayCircleIcon className="w-6 h-6" />, endpoint: "/v1/movie", detail: t("catalog.movies.desc") },
    { label: t("catalog.drama.label"), icon: <SparklesIcon className="w-6 h-6" />, endpoint: "/v1/serial", detail: t("catalog.drama.desc") },
    { label: t("catalog.short.label"), icon: <BoltIcon className="w-6 h-6" />, endpoint: "/v1/short", detail: t("catalog.short.desc") },
    { label: t("catalog.anime.label"), icon: <CpuChipIcon className="w-6 h-6" />, endpoint: "/v1/anime", detail: t("catalog.anime.desc") },
  ];

  const features = [
    { title: t("features.fast.title"), desc: t("features.fast.desc"), icon: <BoltIcon className="w-5 h-5 text-red-400" /> },
    { title: t("features.ready.title"), desc: t("features.ready.desc"), icon: <CodeBracketIcon className="w-5 h-5 text-red-400" /> },
    { title: t("features.secure.title"), desc: t("features.secure.desc"), icon: <ShieldCheckIcon className="w-5 h-5 text-red-400" /> },
  ];

  const endpoints = [
    { method: "GET", route: "/v1/movie/trending", desc: t("endpoints.ep1") },
    { method: "GET", route: "/v1/movie/search?q=...", desc: t("endpoints.ep2") },
    { method: "GET", route: "/v1/movie/id=:id", desc: t("endpoints.ep3") },
    { method: "GET", route: "/v1/movie/id=:id/stream", desc: t("endpoints.ep4") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("/api/v1/user");
        setIsLoggedIn(response.ok);
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
    <main className="min-h-screen bg-[#050505] text-zinc-200 selection:bg-red-500/30 font-sans overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-red-900/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-purple-900/10 blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <p className="font-display text-xl font-bold tracking-wide text-white">DB<span className="text-red-500">Movie</span></p>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">{t("nav.features")}</a>
            <a href="#endpoints" className="hover:text-white transition-colors">{t("nav.endpoints")}</a>
            <Link href="/docs" className="hover:text-white transition-colors">{t("nav.docs")}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <select 
              value={locale} 
              onChange={(e) => router.replace(pathname, { locale: e.target.value })}
              className="bg-transparent text-zinc-400 text-sm font-medium border border-white/10 rounded-md px-2 py-1 outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              <option value="en" className="bg-[#050505] text-white">EN</option>
              <option value="id" className="bg-[#050505] text-white">ID</option>
              <option value="nl" className="bg-[#050505] text-white">NL</option>
              <option value="ja" className="bg-[#050505] text-white">JA</option>
              <option value="zh" className="bg-[#050505] text-white">ZH</option>
              <option value="ar" className="bg-[#050505] text-white">AR</option>
              <option value="de" className="bg-[#050505] text-white">DE</option>
              <option value="af" className="bg-[#050505] text-white">AF</option>
            </select>

            {!loading && isLoggedIn ? (
              <>
                <Link href="/dashboard" className="hidden sm:block text-sm font-semibold hover:text-white transition-colors">
                  {t("nav.dashboard")}
                </Link>
                <button onClick={handleLogout} className="rounded-full px-5 py-2 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hidden sm:block text-sm font-semibold hover:text-white transition-colors">
                  {t("nav.signIn")}
                </Link>
                <Link href="/auth/register" className="rounded-full px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all">
                  {t("nav.getStarted")}
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="pt-32 pb-20 mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto pt-10 pb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-widest mb-8 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {t("hero.apiLive")}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {t("hero.title")} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500">
              {t("hero.titleHighlight")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero.desc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register" className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-bold text-white bg-red-600 hover:bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] transition-all flex items-center justify-center gap-2 group">
              {t("hero.generateKey")}
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs" className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2">
              <CodeBracketIcon className="w-5 h-5" />
              {t("hero.readDocs")}
            </Link>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-20 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group relative rounded-3xl bg-gradient-to-b from-white/5 to-transparent p-8 border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CATALOG SECTION */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t("catalog.title")}</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">{t("catalog.desc")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apiCards.map((card, idx) => (
              <div key={idx} className="group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-300">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-red-400 group-hover:scale-110 group-hover:text-red-500 transition-all duration-300">
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">{card.label}</h3>
                  </div>
                  <div className="text-xs font-mono text-zinc-500 mb-4 bg-white/5 p-2 rounded-lg inline-block self-start">
                    {card.endpoint}
                  </div>
                  <p className="text-sm text-zinc-400 flex-grow">{card.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CODE PREVIEW SECTION */}
        <section id="endpoints" className="py-20 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t("endpoints.title")}</h2>
              <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                {t("endpoints.desc")}
              </p>
              
              <div className="space-y-4">
                {endpoints.map((ep, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{ep.method}</span>
                    <span className="font-mono text-sm text-zinc-300">{ep.route}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden">
              <div className="flex items-center px-4 py-3 bg-[#111] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto text-xs text-zinc-500 font-mono">response.json</div>
              </div>
              <div className="p-6 overflow-x-auto text-sm font-mono leading-loose">
                <span className="text-zinc-400">{"{"}</span><br/>
                <span className="text-zinc-400">  "status": </span><span className="text-purple-400">true</span><span className="text-zinc-400">,</span><br/>
                <span className="text-zinc-400">  "message": </span><span className="text-green-400">"Movie streaming URLs retrieved"</span><span className="text-zinc-400">,</span><br/>
                <span className="text-zinc-400">  "data": [</span><br/>
                <span className="text-zinc-400">    {"{"}</span><br/>
                <span className="text-zinc-400">      "id": </span><span className="text-green-400">"mv_stream_102"</span><span className="text-zinc-400">,</span><br/>
                <span className="text-zinc-400">      "streamUrl1": </span><span className="text-blue-400">"https://cdn.dbmovie.com/v/silent-horizon-1080p.mp4"</span><br/>
                <span className="text-zinc-400">    {"}"}</span><br/>
                <span className="text-zinc-400">  ]</span><br/>
                <span className="text-zinc-400">{"}"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 mt-12 rounded-[3rem] bg-gradient-to-br from-red-900/20 via-[#0a0a0a] to-[#0a0a0a] border border-red-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-6">{t("cta.title")}</h2>
            <p className="text-zinc-400 mb-10 text-lg">{t("cta.desc")}</p>
            <Link href="/auth/register" className="inline-block rounded-full px-10 py-5 text-lg font-bold text-white bg-red-600 hover:bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:-translate-y-1 transition-all">
              {t("cta.start")}
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
