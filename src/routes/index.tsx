import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-inverter.png";
import diagOverview from "@/assets/diagram-inverter-overview.png";
import diagDcAc from "@/assets/diagram-dc-vs-ac.png";
import diagHow from "@/assets/diagram-how-it-works.png";
import diagUse from "@/assets/diagram-use-cases.png";
import diagBatt from "@/assets/diagram-batteries.png";
import diagBuy from "@/assets/diagram-where-to-buy.png";
import diagSmall from "@/assets/diagram-small-batteries.png";
import diagSketch from "@/assets/diagram-concept-sketch.png";
import diagCad2d from "@/assets/diagram-cad-2d.png";
import diagCad3d from "@/assets/diagram-cad-3d.png";

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
    ["small", "Small Batteries"],
    ["all-in-one", "All-in-One"],
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

      {/* Small Batteries */}
      <Section
        id="small"
        eyebrow="06 / Lightweight Loads"
        title="Small batteries for short, low-power runs"
      >
        <Diagram
          src={diagSmall}
          alt="Small portable batteries paired with a mini inverter"
          caption="07 — Small Battery → Mini Inverter Plan"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            [
              "18650 Li-ion Pack",
              "11.1V (3S)",
              "~2–3 Ah",
              "DIY pack with BMS. Powers a laptop charger or LED lamp for 30–60 min.",
            ],
            [
              "USB-C Power Bank w/ 12V DC out",
              "12V",
              "20,000–27,000 mAh",
              "Plug-and-play. Run a 100W mini inverter for ~30 min — phone, router, small fan.",
            ],
            [
              "Sealed Lead-Acid 12V 7Ah",
              "12V",
              "7 Ah",
              "Cheap, heavy for its size. Good for ~20 min at 100W. Common in alarm systems.",
            ],
            [
              "RC LiPo 3S",
              "11.1V",
              "2–5 Ah",
              "Very light, high discharge. Short bursts (10–20 min) — handle with care.",
            ],
          ].map(([name, v, cap, note]) => (
            <div key={name} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-baseline justify-between">
                <div className="text-foreground">{name}</div>
                <div className="font-mono text-xs text-cyan-brand">{v} · {cap}</div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-cyan-brand/40 bg-surface p-6">
          <div className="font-mono text-xs uppercase tracking-widest text-cyan-brand">
            ▸ The Plan — Small Battery + Mini Inverter
          </div>
          <ol className="mt-4 grid gap-4 md:grid-cols-4">
            {[
              ["Pick a 100–150W mini inverter", "Cigarette-plug style, accepts 11–15V DC."],
              ["Match voltage", "Battery must sit in the 11–15V window (3S Li-ion or 12V SLA)."],
              ["Check current draw", "Watts ÷ 12V = Amps. A 60W laptop ≈ 5A from the battery."],
              ["Estimate runtime", "Battery Ah ÷ Amps ≈ hours. 7Ah ÷ 5A ≈ 1.4 h (derate ~70%)."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-lg border border-border bg-surface-2 p-4">
                <div className="font-mono text-xs text-cyan-brand">STEP {i + 1}</div>
                <div className="mt-2 text-sm text-foreground">{t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{d}</div>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl font-mono text-xs text-muted-foreground">
            <span className="text-cyan-brand">Caution:</span> never connect a single
            3.7V cell directly to a 12V inverter, and always use a battery with a
            BMS or proper fuse. Small batteries are for short, light loads —
            phones, lamps, routers, fans — not power tools.
          </p>
        </div>
      </Section>

      {/* Batteries */}
      {/* All-in-One */}
      <Section
        id="all-in-one"
        eyebrow="07 / Integrated Devices"
        title="All-in-one battery + inverter — already on the market"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              name: "Jackery Explorer 240 v2",
              spec: "256 Wh · 300W AC · USB-C PD 100W",
              note: "The classic compact 'power station'. Pure sine wave AC outlet, runs a laptop or mini fridge for hours.",
              url: "https://www.jackery.com/products/explorer-240-v2-portable-power-station",
            },
            {
              name: "EcoFlow River 3",
              spec: "245 Wh · 300W AC (600W X-Boost) · LiFePO4",
              note: "LiFePO4 chemistry, 3,000 cycles, fast 1-hour recharge.",
              url: "https://us.ecoflow.com/products/river-3-portable-power-station",
            },
            {
              name: "Anker 521 PowerHouse",
              spec: "256 Wh · 200W AC · LiFePO4",
              note: "Lightweight (3.7 kg), shoulder-strap-friendly. Good for DJ rigs and tailgates.",
              url: "https://www.anker.com/products/a1720",
            },
            {
              name: "BLUETTI EB3A",
              spec: "268 Wh · 600W AC · LiFePO4",
              note: "Highest sustained AC output in this class — handles small power tools.",
              url: "https://www.bluettipower.com/products/eb3a-portable-power-station",
            },
          ].map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-cyan-brand"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-foreground">{p.name}</div>
                <span className="font-mono text-xs text-cyan-brand">↗ buy</span>
              </div>
              <div className="mt-1 font-mono text-xs text-cyan-brand">{p.spec}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
            </a>
          ))}
        </div>

        <p className="mt-8 max-w-3xl font-mono text-sm text-muted-foreground">
          <span className="text-cyan-brand">∴</span> These "portable power
          stations" are exactly the integrated form-factor — a lithium battery,
          inverter, charge controller, and outlet packed into one rugged box.
          Below is our own concept design for a sub-300W unit, drawn three ways.
        </p>

        <div className="mt-12 space-y-10">
          <div>
            <Diagram
              src={diagSketch}
              alt="Artistic concept sketch of an all-in-one battery outlet device"
              caption="08A — Artistic Concept Sketch"
            />
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <Diagram
              src={diagCad2d}
              alt="2D AutoCAD-style engineering drawing"
              caption="08B — 2D Engineering Drawing (AutoCAD style)"
            />
            <Diagram
              src={diagCad3d}
              alt="3D SolidWorks-style CAD render"
              caption="08C — 3D CAD Render (SolidWorks style)"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 font-mono text-sm">
          {[
            ["Enclosure", "180 × 95 × 65 mm rugged ABS with rubberized corners and integrated handle."],
            ["Cells", "8× 18650 LiFePO4 in 4S2P → ~13.2V nominal, ~6 Ah, ~80 Wh."],
            ["Inverter", "Pure-sine 150W (300W peak), MOSFET H-bridge with toroidal output filter."],
            ["Ports", "1× 120V AC outlet, 1× USB-C PD 60W, 1× 12V DC barrel out."],
            ["Display", "0.96\" OLED — battery %, output W, runtime estimate."],
            ["Safety", "BMS with over-current, over-temp, short-circuit; 5A AC fuse."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-border bg-surface p-4">
              <div className="text-cyan-brand">{t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </Section>

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
