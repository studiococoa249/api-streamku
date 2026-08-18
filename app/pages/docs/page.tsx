const docs = [
  {
    title: "Authentication",
    body: "Semua request API perlu menggunakan header Authorization dengan format Bearer YOUR_API_KEY.",
  },
  {
    title: "Response Format",
    body: "Semua endpoint mengembalikan JSON dengan format status, message, dan data. Error dikembalikan dalam format properti error.",
  },
  {
    title: "Movies",
    body: "Endpoint /api/v1/movies menampilkan daftar semua film termasuk nama, genre, banner, trailer, dan stream URL.",
  },
  {
    title: "Drama",
    body: "Endpoint /api/v1/drama menampilkan list drama beserta episode dan daftar stream URL per episode.",
  },
  {
    title: "Anime",
    body: "Endpoint /api/v1/anime menampilkan list anime terbaru, kategori, dan detail setiap judul.",
  },
  {
    title: "Short Drama",
    body: "Endpoint /api/v1/short-drama berisi list short drama dengan durasi singkat dan episode pendek.",
  },
];

const endpoints = [
  { method: "GET", route: "/api/v1/movies", description: "List semua film" },
  { method: "GET", route: "/api/v1/movie/:id", description: "Detail film" },
  { method: "GET", route: "/api/v1/drama", description: "List seluruh drama" },
  { method: "GET", route: "/api/v1/drama/:id/episodes", description: "Episode drama" },
  { method: "GET", route: "/api/v1/anime", description: "List anime" },
  { method: "GET", route: "/api/v1/short-drama", description: "List short drama" },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-red-300">Documentation</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">DB Movie API Docs</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="space-y-4 rounded-[28px] border border-white/10 bg-[#111318] p-6">
            {docs.map((doc) => (
              <div key={doc.title} className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <h2 className="text-lg font-bold text-white">{doc.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{doc.body}</p>
              </div>
            ))}
          </section>

          <section className="rounded-[28px] border border-red-500/20 bg-[#111318] p-6">
            <h2 className="font-display text-xl font-bold text-white">Base URL</h2>
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#0d0d12] p-4 font-mono text-sm text-red-300">
              https://api.dbmovie.com
            </div>

            <div className="mt-5 space-y-3">
              {endpoints.map((endpoint) => (
                <div key={endpoint.route} className="rounded-2xl border border-white/10 bg-white/3 p-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-sm text-zinc-200">{endpoint.route}</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-400">{endpoint.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
