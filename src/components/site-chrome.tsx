import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Home" },
  { to: "/lightweight", label: "Lightweight" },
  { to: "/heavy-duty", label: "Heavy-Duty" },
  { to: "/all-in-one", label: "All-in-One" },
  { to: "/evs", label: "EVs" },
  { to: "/theory", label: "Theory" },
  { to: "/build-your-own", label: "Build Your Own" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-brand shadow-glow" />
          <span className="text-foreground">BATTERY</span>
          <span className="text-cyan-brand">/OUTLET</span>
        </Link>
        <nav className="hidden flex-wrap gap-6 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-cyan-brand" }}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan-brand"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span className="text-cyan-brand">⌁</span> Battery Powered Outlets — A Field Guide
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, blurb }: { eyebrow: string; title: string; blurb: string }) {
  return (
    <section className="bg-hero-glow border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan-brand"
        >
          <span className="text-cyan-brand">←</span> Back to Home
        </Link>
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-brand">
            ⌁ {eyebrow}
          </span>
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{blurb}</p>
      </div>
    </section>
  );
}

export function SectionNav({ current }: { current: "/lightweight" | "/heavy-duty" | "/all-in-one" | "/evs" | "/theory" | "/build-your-own" }) {
  const all = [
    { to: "/lightweight" as const, label: "Lightweight Setups" },
    { to: "/heavy-duty" as const, label: "Heavy-Duty Setups" },
    { to: "/all-in-one" as const, label: "All-in-One Stations" },
    { to: "/evs" as const, label: "EVs With Outlets" },
    { to: "/theory" as const, label: "Theory" },
    { to: "/build-your-own" as const, label: "Build Your Own" },
  ];
  const others = all.filter((p) => p.to !== current);
  return (
    <section className="border-t border-border bg-surface/40 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cyan-brand">
          Explore Other Sections
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <Link
            to="/"
            className="rounded-lg border border-border bg-surface p-4 text-sm transition-colors hover:border-cyan-brand"
          >
            <span className="text-cyan-brand">←</span> Home
          </Link>
          {others.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="rounded-lg border border-border bg-surface p-4 text-sm transition-colors hover:border-cyan-brand"
            >
              {p.label} <span className="text-cyan-brand">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-brand">
            {eyebrow}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <h2 className="mb-10 max-w-3xl text-3xl font-semibold md:text-4xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function Diagram({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-glow">
      <img src={src} alt={alt} loading="lazy" width={1280} height={720} className="w-full" />
      <figcaption className="border-t border-border bg-surface-2 px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        <span className="text-cyan-brand">FIG.</span> {caption}
      </figcaption>
    </figure>
  );
}
