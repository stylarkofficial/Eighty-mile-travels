export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-slate-500)]">
          404
        </p>
        <h1 className="section-title mb-4 text-4xl font-extrabold md:text-5xl">
          This route does not exist
        </h1>
        <p className="section-copy mx-auto max-w-lg text-lg">
          The page you requested could not be found. Return to the homepage to continue.
        </p>
        <a
          href="/"
          className="premium-button-primary mt-8 inline-flex px-6 py-3 font-semibold"
        >
          Back Home
        </a>
      </div>
    </main>
  );
}
