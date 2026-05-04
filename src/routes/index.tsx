import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-inverter.png";
import diagOverview from "@/assets/diagram-inverter-overview.png";
import diagDcAc from "@/assets/diagram-dc-vs-ac.png";
import diagHow from "@/assets/diagram-how-it-works.png";
import diagUse from "@/assets/diagram-use-cases.png";
import diagBatt from "@/assets/diagram-batteries.png";
import diagBuy from "@/assets/diagram-where-to-buy.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Battery Powered Outlets — Power Inverters Explained" },
      {
        name: "description",
        content:
          "A visual guide to battery powered outlets (power inverters): why you need one, DC vs AC, how they work, where to buy, and the best batteries to pair with them.",
      },
    ],
  }),
});

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-brand">
            {eyebrow}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <h2 className="mb-12 max-w-3xl text-4xl font-semibold md:text-5xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Diagram({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-glow">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1280}
        height={720}
        className="w-full"
      />
      <figcaption className="border-t border-border bg-surface-2 px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        <span className="text-cyan-brand">FIG.</span> {caption}
      </figcaption>
    </figure>
  );
}

function Index() {
  const nav = [
    ["why", "Why"],
    ["dc-ac", "DC vs AC"],
    ["how", "How It Works"],
    ["buy", "Where to Buy"],
    ["batteries", "Batteries"],
  ];

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-brand shadow-glow" />
            <span className="text-foreground">BATTERY</span>
            <span className="text-cyan-brand">/OUTLET</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan-brand"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="bg-hero-glow relative overflow-hidden">
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

      {/* Master Diagram */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Diagram
            src={diagOverview}
            alt="System overview of a battery, inverter, and AC outlet"
            caption="01 — System Overview: Battery → Inverter → 120V AC"
          />
        </div>
      </section>

      {/* Why */}
      <Section id="why" eyebrow="01 / Use Cases" title="Why use a power inverter">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <Diagram
              src={diagUse}
              alt="Common inverter use cases"
              caption="02 — Field Applications"
            />
          </div>
          <ul className="md:col-span-2 space-y-4 font-mono text-sm">
            {[
              ["DJ controller in the park", "Run your rig from a deep cycle battery — no generator noise."],
              ["Tailgate lights & speakers", "String lights, blender, sound system on a single 12V."],
              ["Job site power tools", "Saws, drills, chargers — anywhere a truck can park."],
              ["Mini fridge while camping", "Keep food cold without shore power."],
              ["Emergency backup", "Outage-proof your router, lamp, or CPAP."],
            ].map(([t, d]) => (
              <li key={t} className="border-l-2 border-cyan-brand pl-4">
                <div className="text-cyan-brand">{t}</div>
                <div className="mt-1 text-muted-foreground">{d}</div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* DC vs AC */}
      <Section id="dc-ac" eyebrow="02 / Electrical Theory" title="DC vs AC — and why an inverter is needed">
        <div className="grid gap-8 lg:grid-cols-2">
          <Diagram
            src={diagDcAc}
            alt="Direct current versus alternating current waveforms"
            caption="03 — Waveform Comparison"
          />
          <div className="grid grid-cols-2 gap-4 self-center">
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">DC</div>
              <div className="mt-2 text-2xl text-foreground">Direct Current</div>
              <p className="mt-3 text-sm text-muted-foreground">
                One direction. Constant voltage. What every battery stores.
              </p>
            </div>
            <div className="rounded-xl border border-cyan-brand/40 bg-surface p-6">
              <div className="font-mono text-xs uppercase tracking-widest text-cyan-brand">AC</div>
              <div className="mt-2 text-2xl text-foreground">Alternating Current</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Reverses 60 times a second. What your wall outlet delivers.
              </p>
            </div>
            <div className="col-span-2 rounded-xl border border-border bg-surface-2 p-6 font-mono text-sm">
              <span className="text-cyan-brand">∴</span> A cord-powered device expects
              AC. A battery only provides DC. The inverter bridges the gap.
            </div>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section id="how" eyebrow="03 / Mechanism" title="How a power inverter works">
        <Diagram
          src={diagHow}
          alt="Internal block diagram of an inverter"
          caption="04 — Internal Signal Path"
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            ["Oscillator", "Generates a 60 Hz timing signal."],
            ["Switching", "MOSFETs flip DC polarity rapidly."],
            ["Transformer", "Steps voltage up from 12V to 120V."],
            ["Filter", "Smooths output into a clean sine wave."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-xl border border-border bg-surface p-5">
              <div className="font-mono text-xs text-cyan-brand">STEP {i + 1}</div>
              <div className="mt-2 text-lg">{t}</div>
              <div className="mt-2 text-sm text-muted-foreground">{d}</div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Where to buy */}
      <Section id="buy" eyebrow="04 / Sourcing" title="Where to purchase a power inverter">
        <div className="grid gap-8 lg:grid-cols-2">
          <Diagram
            src={diagBuy}
            alt="Retail channels for power inverters"
            caption="05 — Retail Channels"
          />
          <div className="grid gap-3 self-center">
            {[
              ["Amazon / Online", "Renogy, BESTEK, Krieger — widest selection."],
              ["Auto parts stores", "AutoZone, O'Reilly — small 150–400W units."],
              ["Hardware stores", "Home Depot, Lowe's — contractor-grade brands."],
              ["Marine supply", "West Marine — pure sine wave, weather-rated."],
              ["RV dealers", "Higher capacity 1000W–3000W systems."],
            ].map(([t, d]) => (
              <div
                key={t}
                className="flex items-start gap-4 rounded-lg border border-border bg-surface p-4"
              >
                <span className="font-mono text-cyan-brand">▸</span>
                <div>
                  <div className="text-foreground">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Batteries */}
      <Section id="batteries" eyebrow="05 / Power Source" title="Best batteries for an inverter">
        <Diagram
          src={diagBatt}
          alt="Battery type comparison"
          caption="06 — Battery Chemistry Comparison"
        />
        <div className="mt-10 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left font-mono text-sm">
            <thead className="bg-surface-2 text-cyan-brand">
              <tr>
                <th className="p-4">Type</th>
                <th className="p-4">Best For</th>
                <th className="p-4">Cycles</th>
                <th className="p-4">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface">
              {[
                ["LiFePO4", "Daily portable use", "3000–5000", "★ Best overall"],
                ["AGM Deep Cycle", "RVs, boats, off-grid", "500–800", "Solid value"],
                ["Flooded Lead-Acid", "Stationary backup", "300–500", "Cheapest"],
                ["Marine Deep Cycle", "Mixed start/draw", "400–700", "Versatile"],
              ].map((row) => (
                <tr key={row[0]} className="text-muted-foreground">
                  {row.map((c, i) => (
                    <td key={i} className={`p-4 ${i === 0 ? "text-foreground" : ""} ${i === 3 ? "text-cyan-brand" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 max-w-2xl font-mono text-sm text-muted-foreground">
          <span className="text-cyan-brand">Rule of thumb:</span> match battery
          amp-hours to inverter wattage. A 1000W inverter pulls ~85A from a 12V
          battery — a 100Ah LiFePO4 gives roughly one hour of full load.
        </p>
      </Section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-cyan-brand">⌁</span> Battery Powered Outlets — A Field Guide
        </div>
      </footer>
    </div>
  );
}
