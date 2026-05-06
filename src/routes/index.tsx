import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-inverter.png";
import diagUse from "@/assets/diagram-use-cases.png";
import { SiteHeader, SiteFooter, Diagram } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Battery Powered Outlets — Why Go Portable" },
      {
        name: "description",
        content:
          "Why a battery-powered outlet is worth having: run cord-powered tools, instruments, and appliances anywhere.",
      },
    ],
  }),
});

const paths = [
  {
    to: "/lightweight",
    eyebrow: "01",
    title: "Lightweight Inverter Setups",
    blurb: "Small batteries + mini inverters for phones, lamps, routers, and short jobs.",
  },
  {
    to: "/heavy-duty",
    eyebrow: "02",
    title: "Heavy-Duty Inverter Setups",
    blurb: "Deep-cycle batteries + 1000–3000W inverters for tools, fridges, off-grid living.",
  },
  {
    to: "/all-in-one",
    eyebrow: "03",
    title: "All-in-One Portable Battery",
    blurb: "Sealed power stations — battery, inverter, and outlet in one rugged box.",
  },
  {
    to: "/evs",
    eyebrow: "04",
    title: "EVs With Outlets",
    blurb: "Trucks and SUVs with AC outlets built in — your vehicle is the inverter.",
  },
] as const;

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="bg-hero-glow relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-32">
          <div className="flex flex-col justify-center">
            <span className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan-brand">
              ⌁ Field Guide v1.0
            </span>
            <h1 className="text-5xl font-semibold leading-[1.05] md:text-7xl">
              Battery <span className="text-cyan-brand">Powered</span> Outlets.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Inverters that turn a battery into a wall outlet — so any cord-powered
              tool, instrument, or appliance can travel with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
              {["DC → AC", "12V / 24V", "Pure Sine", "Portable"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-cyan-brand/40 px-3 py-1 text-cyan-brand"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Power inverter and deep cycle battery"
              width={1600}
              height={900}
              className="rounded-2xl border border-border shadow-glow"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-brand">
              The Why
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h2 className="mb-12 max-w-3xl text-4xl font-semibold md:text-5xl">
            Why use a power inverter
          </h2>

          <Diagram src={diagUse} alt="Common inverter use cases" caption="01 — Field Applications" />

          <ul className="mt-10 grid gap-4 font-mono text-sm md:grid-cols-2">
            {[
              ["DJ controller in the park", "Run your rig from a deep cycle battery — no generator noise."],
              ["Tailgate lights & speakers", "String lights, blender, sound system on a single 12V."],
              ["Job site power tools", "Saws, drills, chargers — anywhere a truck can park."],
              ["Mini fridge while camping", "Keep food cold without shore power."],
              ["Emergency backup", "Outage-proof your router, lamp, or CPAP."],
              ["Remote film/photo shoots", "Charge laptops, monitors, and lights in the field."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-xl border border-border bg-surface p-5">
                <div className="text-cyan-brand">{t}</div>
                <div className="mt-2 text-muted-foreground">{d}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-brand">
              Pick a Path
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h2 className="mb-12 max-w-3xl text-4xl font-semibold md:text-5xl">
            Four ways to get a battery-powered outlet
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {paths.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-cyan-brand"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-cyan-brand">/ {s.eyebrow}</span>
                  <span className="font-mono text-xs text-cyan-brand transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <div className="mt-3 text-2xl text-foreground">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
