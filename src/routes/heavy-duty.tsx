import { createFileRoute } from "@tanstack/react-router";
import diagOverview from "@/assets/diagram-inverter-overview.png";
import diagHow from "@/assets/diagram-how-it-works.png";
import diagBatt from "@/assets/diagram-batteries.png";
import diagBuy from "@/assets/diagram-where-to-buy.png";
import { SiteHeader, SiteFooter, PageHero, Section, Diagram } from "@/components/site-chrome";

export const Route = createFileRoute("/heavy-duty")({
  component: HeavyDuty,
  head: () => ({
    meta: [
      { title: "Heavy-Duty Inverter Setups — Battery Powered Outlets" },
      {
        name: "description",
        content:
          "Deep-cycle batteries with 1000–3000W pure sine inverters for power tools, fridges, RVs, and off-grid living.",
      },
    ],
  }),
});

const buyChannels = [
  ["Amazon / Online", "Renogy, BESTEK, Krieger — widest selection.", "https://www.amazon.com/s?k=power+inverter"],
  ["Auto parts stores", "AutoZone, O'Reilly — small 150–400W units.", "https://www.autozone.com/search?searchText=power+inverter"],
  ["Hardware stores", "Home Depot, Lowe's — contractor-grade brands.", "https://www.homedepot.com/s/power%2520inverter"],
  ["Marine supply", "West Marine — pure sine wave, weather-rated.", "https://www.westmarine.com/search?q=inverter"],
  ["RV dealers", "Higher capacity 1000W–3000W systems.", "https://www.campingworld.com/search?q=power+inverter"],
] as const;

const batteryRows = [
  ["LiFePO4", "Daily portable use", "3000–5000", "★ Best overall", "https://www.amazon.com/s?k=lifepo4+battery+12v"],
  ["AGM Deep Cycle", "RVs, boats, off-grid", "500–800", "Solid value", "https://www.amazon.com/s?k=agm+deep+cycle+battery"],
  ["Flooded Lead-Acid", "Stationary backup", "300–500", "Cheapest", "https://www.amazon.com/s?k=flooded+lead+acid+deep+cycle+battery"],
  ["Marine Deep Cycle", "Mixed start/draw", "400–700", "Versatile", "https://www.amazon.com/s?k=marine+deep+cycle+battery"],
] as const;

function HeavyDuty() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageHero
        eyebrow="02 / Heavy-Duty Setups"
        title="Big batteries, big inverters, big loads"
        blurb="Power tools, mini fridges, full DJ rigs, even off-grid cabins. A deep-cycle battery bank paired with a 1000–3000W pure sine inverter does the job."
      />

      <Section eyebrow="Overview" title="The full system">
        <Diagram src={diagOverview} alt="Battery → Inverter → 120V AC" caption="A — System Overview" />
      </Section>

      <Section eyebrow="Mechanism" title="How a power inverter works">
        <Diagram src={diagHow} alt="Inverter internal stages" caption="B — Internal Signal Path" />
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

      <Section eyebrow="Sourcing" title="Where to buy a heavy-duty inverter">
        <div className="grid gap-8 lg:grid-cols-2">
          <Diagram src={diagBuy} alt="Retail channels for inverters" caption="C — Retail Channels" />
          <div className="grid gap-3 self-center">
            {buyChannels.map(([t, d, url]) => (
              <a
                key={t}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-cyan-brand"
              >
                <span className="font-mono text-cyan-brand">▸</span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-foreground">{t}</div>
                    <span className="font-mono text-xs text-cyan-brand">↗</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Power Source" title="Best batteries for a heavy-duty inverter">
        <Diagram src={diagBatt} alt="Battery type comparison" caption="D — Battery Chemistry Comparison" />
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
              {batteryRows.map((row) => (
                <tr
                  key={row[0]}
                  className="cursor-pointer text-muted-foreground transition-colors hover:bg-surface-2"
                  onClick={() => window.open(row[4], "_blank", "noopener,noreferrer")}
                >
                  {row.slice(0, 4).map((c, i) => (
                    <td key={i} className={`p-4 ${i === 0 ? "text-foreground" : ""} ${i === 3 ? "text-cyan-brand" : ""}`}>
                      {i === 3 ? `${c} ↗` : c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 max-w-2xl font-mono text-sm text-muted-foreground">
          <span className="text-cyan-brand">Rule of thumb:</span> match battery amp-hours to inverter
          wattage. A 1000W inverter pulls ~85A from a 12V battery — a 100Ah LiFePO4 gives roughly one
          hour of full load.
        </p>
      </Section>

      <SiteFooter />
    </div>
  );
}
