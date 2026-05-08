import { createFileRoute } from "@tanstack/react-router";
import diagEv from "@/assets/diagram-ev-outlets.png";
import diagRivian from "@/assets/diagram-rivian-r1t.png";
import { SiteHeader, SiteFooter, PageHero, Section, Diagram, SectionNav } from "@/components/site-chrome";

export const Route = createFileRoute("/evs")({
  component: EvsPage,
  head: () => ({
    meta: [
      { title: "EVs With Outlets — Battery Powered Outlets" },
      {
        name: "description",
        content:
          "Electric vehicles with built-in 120V AC outlets and Vehicle-to-Load (V2L) capability: Ford F-150 Lightning, Rivian R1T, Hyundai Ioniq 5, Kia EV6, and more.",
      },
    ],
  }),
});

const evs = [
  {
    name: "Ford F-150 Lightning",
    spec: "Pro Power Onboard · up to 9.6 kW · 4–10 outlets",
    note: "The benchmark. Run a job site, power a house during an outage, or host a tailgate from the bed.",
    url: "https://www.ford.com/trucks/f150/f150-lightning/",
  },
  {
    name: "Rivian R1T / R1S",
    spec: "120V outlets in bed & gear tunnel · ~1.5 kW",
    note: "Two 120V outlets in the truck bed plus one in the gear tunnel. Ideal for camping and tools.",
    url: "https://rivian.com/r1t",
    image: true,
  },
  {
    name: "Tesla Cybertruck",
    spec: "Powershare · up to 11.5 kW · 120V + 240V outlets",
    note: "Two 120V outlets and a 240V outlet in the bed, plus a 120V in the cabin. Powershare can back up a home.",
    url: "https://www.tesla.com/cybertruck",
  },
  {
    name: "Hyundai Ioniq 5",
    spec: "V2L · 1.9 kW · 120V interior + exterior adapter",
    note: "An interior outlet under the rear seat plus an adapter that turns the charge port into a 120V outlet.",
    url: "https://www.hyundaiusa.com/us/en/vehicles/ioniq-5",
  },
  {
    name: "Kia EV6 / EV9",
    spec: "V2L · 1.9 kW · cargo-area outlet + V2L adapter",
    note: "Same V2L system as Hyundai. EV9 expands it to multiple outlets and a bigger battery.",
    url: "https://www.kia.com/us/en/ev6",
  },
  {
    name: "Chevrolet Silverado EV",
    spec: "PowerBase · up to 10.2 kW · 10 outlets",
    note: "Up to ten 120V outlets and a 240V outlet. Targets contractors and overlanders.",
    url: "https://www.chevrolet.com/electric/silverado-ev",
  },
  {
    name: "GMC Hummer EV",
    spec: "PowerStation · 120V outlets in bed",
    note: "Bed outlets plus the option to power-share to another EV.",
    url: "https://www.gmc.com/electric/hummer-ev",
  },
];

function EvsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageHero
        eyebrow="04 / EVs With Outlets"
        title="Your vehicle is the inverter"
        blurb="Modern EVs ship with built-in 120V outlets and Vehicle-to-Load (V2L). The battery is already huge — you just plug in."
      />

      <Section eyebrow="The Lineup" title="EVs that have AC outlets built in">
        <Diagram src={diagEv} alt="EVs with built-in 120V outlets" caption="A — EVs With 120V Outlets" />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {evs.map((v) => (
            <a
              key={v.name}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-cyan-brand"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-foreground">{v.name}</div>
                <span className="font-mono text-xs text-cyan-brand">↗</span>
              </div>
              <div className="mt-1 font-mono text-xs text-cyan-brand">{v.spec}</div>
              <p className="mt-2 text-sm text-muted-foreground">{v.note}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why It Matters" title="An EV beats a portable inverter on every spec">
        <div className="grid gap-4 md:grid-cols-3 font-mono text-sm">
          {[
            ["Capacity", "An F-150 Lightning's 131 kWh ≈ 1,600× the energy of a Jackery 240."],
            ["Power", "9.6 kW continuous runs an entire job site or a small home."],
            ["No setup", "Outlets are factory-wired and weather-rated — just open the door and plug in."],
            ["Quiet", "Silent. No generator, no fumes, allowed in parks and campgrounds."],
            ["Recharge", "DC fast charging refills the 'battery' in 30–60 min on a road trip."],
            ["Backup power", "F-150 Lightning + Charge Station Pro can power a house for ~3–10 days."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-border bg-surface p-4">
              <div className="text-cyan-brand">{t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </Section>

      <SectionNav current="/evs" />
      <SiteFooter />
    </div>
  );
}
