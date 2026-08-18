"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/routing";

function CodeSnippet({ method, route }: { method: string; route: string }) {
  const [activeTab, setActiveTab] = useState("cURL");
  
  const baseUrl = "https://api.dbmovie.com";
  const fullUrl = `${baseUrl}${route}`;
  
  const snippets = {
    cURL: `curl -X ${method} "${fullUrl}" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    PHP: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "${fullUrl}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer YOUR_API_KEY"
]);
$response = curl_exec($ch);
curl_close($ch);
echo $response;
?>`,
    Python: `import requests

url = "${fullUrl}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
response = requests.get(url, headers=headers)
print(response.json())`,
    Node: `fetch('${fullUrl}', {
  method: '${method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));`
  };

  const tabs = Object.keys(snippets);

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-[#0d0d12] overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/5 bg-white/[0.02] px-3 py-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === tab
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-[13px] text-zinc-300 font-mono leading-relaxed">
          {snippets[activeTab as keyof typeof snippets]}
        </pre>
      </div>
    </div>
  );
}

export default function DocsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("DocsPage");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const gettingStartedDocs = [
    {
      id: "authentication",
      title: "Authentication",
      body: t("docs.auth"),
    },
    {
      id: "response-format",
      title: "Response Format",
      body: t("docs.response"),
    },
  ];

  const movieEndpoints = [
    { id: "movie-trending", title: "Trending", method: "GET", route: "/v1/movie/trending", description: t("docs.movieTrending") },
    { id: "movie-search", title: "Search", method: "GET", route: "/v1/movie/search?q=", description: t("docs.movieSearch") },
    { id: "movie-film", title: "Film", method: "GET", route: "/v1/movie/id=$input_id/", description: t("docs.movieDetail") },
    { id: "movie-stream-url", title: "Stream URL", method: "GET", route: "/v1/movie/id=$input_id/stream", description: t("docs.movieStream") },
  ];

  const serialEndpoints = [
    { id: "serial-trending", title: "Trending", method: "GET", route: "/v1/serial/trending", description: t("docs.serialTrending") },
    { id: "serial-search", title: "Search", method: "GET", route: "/v1/serial/search?q=", description: t("docs.serialSearch") },
    { id: "serial-serial", title: "Serial", method: "GET", route: "/v1/serial/id=$input_id/", description: t("docs.serialDetail") },
    { id: "serial-stream-url", title: "Stream URL", method: "GET", route: "/v1/serial/id=$input_id/episode/:ep/stream", description: t("docs.serialStream") },
  ];

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#0b0b0f]/80 px-4 py-4 backdrop-blur-md lg:hidden">
        <span className="font-display text-lg font-bold">{t("title")}</span>
        <div className="flex items-center gap-2">
          <select 
            value={locale} 
            onChange={(e) => router.replace(pathname, { locale: e.target.value })}
            className="bg-transparent text-zinc-400 text-xs font-medium border border-white/10 rounded-md px-1 py-1 outline-none focus:border-red-500 transition-colors cursor-pointer"
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
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[90rem]">
        {/* Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? "fixed inset-0 top-[65px] z-30 block bg-[#0b0b0f]" : "hidden"
          } w-full overflow-y-auto border-r border-white/5 lg:sticky lg:top-0 lg:block lg:h-screen lg:w-72 lg:shrink-0`}
        >
          <div className="px-6 py-8">
            <div className="hidden lg:flex items-center justify-between mb-8">
              <h1 className="font-display text-2xl font-bold tracking-tight text-white">
                DB Movie API
              </h1>
              <select 
                value={locale} 
                onChange={(e) => router.replace(pathname, { locale: e.target.value })}
                className="bg-transparent text-zinc-400 text-xs font-medium border border-white/10 rounded-md px-1 py-1 outline-none focus:border-red-500 transition-colors cursor-pointer"
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
            </div>
            <nav className="mt-8 space-y-8">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                  {t("nav.gettingStarted")}
                </h3>
                <ul className="space-y-2">
                  {gettingStartedDocs.map((doc) => (
                    <li key={doc.id}>
                      <a href={`#${doc.id}`} className="block rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white">
                        {doc.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  {t("nav.movie")}
                </h3>
                <ul className="space-y-2">
                  {movieEndpoints.map((ep) => (
                    <li key={ep.id}>
                      <a href={`#${ep.id}`} className="block rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white">
                        {ep.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
                  {t("nav.serial")}
                </h3>
                <ul className="space-y-2">
                  {serialEndpoints.map((ep) => (
                    <li key={ep.id}>
                      <a href={`#${ep.id}`} className="block rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white">
                        {ep.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-3xl">
            <header className="mb-16">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-red-400">
                <Link href="/" className="hover:text-red-300">Home</Link>
                <span>/</span>
                <span>Documentation</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
                {t("header.title")}
              </h1>
              <p className="mt-4 text-lg text-zinc-400">
                {t("header.desc")}
              </p>
            </header>

            <div className="space-y-16">
              {/* Getting Started Section */}
              <div className="space-y-12">
                {gettingStartedDocs.map((doc) => (
                  <section key={doc.id} id={doc.id} className="scroll-mt-24">
                    <h2 className="group flex items-center font-display text-2xl font-bold text-white">
                      <a href={`#${doc.id}`} className="absolute -ml-8 hidden text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 lg:block">#</a>
                      {doc.title}
                    </h2>
                    <div className="mt-6 rounded-2xl border border-white/5 bg-[#111318] p-6 text-zinc-300 leading-relaxed shadow-lg">
                      {doc.body}
                    </div>
                  </section>
                ))}
              </div>

              <hr className="border-white/5" />

              {/* Movie Section */}
              <div className="space-y-12">
                <div className="mb-8">
                  <h2 className="font-display text-3xl font-bold text-blue-400">Movie API</h2>
                  <p className="mt-2 text-zinc-400">{t("sections.movieDesc")}</p>
                </div>
                
                {movieEndpoints.map((ep) => (
                  <section key={ep.id} id={ep.id} className="scroll-mt-24">
                    <h3 className="group flex items-center font-display text-xl font-bold text-white">
                      <a href={`#${ep.id}`} className="absolute -ml-8 hidden text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 lg:block">#</a>
                      {ep.title}
                    </h3>
                    <div className="mt-5 rounded-2xl border border-white/5 bg-[#111318] shadow-lg overflow-hidden">
                      <div className="flex items-center gap-4 border-b border-white/5 bg-white/[0.02] p-4">
                        <span className="flex w-14 items-center justify-center rounded-md bg-blue-500/10 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                          {ep.method}
                        </span>
                        <code className="font-mono text-sm text-zinc-200 break-all">{ep.route}</code>
                      </div>
                      <div className="p-5 text-sm text-zinc-300 leading-relaxed">
                        <p className="mb-4">{ep.description}</p>
                        <CodeSnippet method={ep.method} route={ep.route} />
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <hr className="border-white/5" />

              {/* Serial Section */}
              <div className="space-y-12">
                <div className="mb-8">
                  <h2 className="font-display text-3xl font-bold text-purple-400">Serial API</h2>
                  <p className="mt-2 text-zinc-400">{t("sections.serialDesc")}</p>
                </div>

                {serialEndpoints.map((ep) => (
                  <section key={ep.id} id={ep.id} className="scroll-mt-24">
                    <h3 className="group flex items-center font-display text-xl font-bold text-white">
                      <a href={`#${ep.id}`} className="absolute -ml-8 hidden text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 lg:block">#</a>
                      {ep.title}
                    </h3>
                    <div className="mt-5 rounded-2xl border border-white/5 bg-[#111318] shadow-lg overflow-hidden">
                      <div className="flex items-center gap-4 border-b border-white/5 bg-white/[0.02] p-4">
                        <span className="flex w-14 items-center justify-center rounded-md bg-purple-500/10 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                          {ep.method}
                        </span>
                        <code className="font-mono text-sm text-zinc-200 break-all">{ep.route}</code>
                      </div>
                      <div className="p-5 text-sm text-zinc-300 leading-relaxed">
                        <p className="mb-4">{ep.description}</p>
                        <CodeSnippet method={ep.method} route={ep.route} />
                      </div>
                    </div>
                  </section>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
