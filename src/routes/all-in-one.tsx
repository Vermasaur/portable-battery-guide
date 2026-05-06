import { createFileRoute } from "@tanstack/react-router";
import diagSketch from "@/assets/diagram-concept-sketch.png";
import diagCad2d from "@/assets/diagram-cad-2d.png";
import diagCad3d from "@/assets/diagram-cad-3d.png";
import { SiteHeader, SiteFooter, PageHero, Section, Diagram } from "@/components/site-chrome";

export const Route = createFileRoute("/all-in-one")({
  component: AllInOne,
  head: () => ({
    meta: [
      { title: "All-in-One Portable Battery — Battery Powered Outlets" },
      {
        name: "description",
        content:
          "Portable power stations that combine battery, inverter, and outlet in one rugged box: Jackery, EcoFlow, Anker, BLUETTI.",
      },
    ],
  }),
});

const products = [
  { name: "Jackery Explorer 240 v2", spec: "256 Wh · 300W AC · USB-C PD 100W", note: "The classic compact 'power station'. Pure sine wave AC, runs a laptop or mini fridge for hours.", url: "https://www.jackery.com/products/explorer-240-v2-portable-power-station" },
  { name: "EcoFlow River 3", spec: "245 Wh · 300W AC (600W X-Boost) · LiFePO4", note: "LiFePO4 chemistry, 3,000 cycles, fast 1-hour recharge.", url: "https://us.ecoflow.com/products/river-3-portable-power-station" },
  { name: "Anker 521 PowerHouse", spec: "256 Wh · 200W AC · LiFePO4", note: "Lightweight (3.7 kg), shoulder-strap-friendly. Good for DJ rigs and tailgates.", url: "https://www.anker.com/products/a1720" },
  { name: "BLUETTI EB3A", spec: "268 Wh · 600W AC · LiFePO4", note: "Highest sustained AC output in this class — handles small power tools.", url: "https://www.bluettipower.com/products/eb3a-portable-power-station" },
];

function AllInOne() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageHero
        eyebrow="03 / All-in-One"
        title="Portable battery, inverter, and outlet — one box"
        blurb="A lithium battery, inverter, charge controller, and outlet packed into one rugged enclosure. Just charge it and plug things in."
      />

      <Section eyebrow="On the Market" title="Buy one off the shelf">
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
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
      </Section>

      <Section eyebrow="Concept Design" title="Our own sub-300W concept, drawn three ways">
        <div className="space-y-10">
          <Diagram src={diagSketch} alt="Artistic concept sketch" caption="A — Artistic Concept Sketch" />
          <div className="grid gap-10 lg:grid-cols-2">
            <Diagram src={diagCad2d} alt="2D AutoCAD-style drawing" caption="B — 2D Engineering Drawing" />
            <Diagram src={diagCad3d} alt="3D SolidWorks-style render" caption="C — 3D CAD Render" />
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

      <SiteFooter />
    </div>
  );
}
