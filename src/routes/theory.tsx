import { createFileRoute } from "@tanstack/react-router";
import diagOverview from "@/assets/diagram-inverter-overview.png";
import diagDcAc from "@/assets/diagram-dc-vs-ac.png";
import diagHow from "@/assets/diagram-how-it-works.png";
import { SiteHeader, SiteFooter, PageHero, Section, Diagram, SectionNav } from "@/components/site-chrome";

export const Route = createFileRoute("/theory")({
  component: TheoryPage,
  head: () => ({
    meta: [
      { title: "Theory — Battery Powered Outlets" },
      {
        name: "description",
        content:
          "How battery-powered outlets work: system overview, DC vs AC current, and the internal signal path of a power inverter.",
      },
    ],
  }),
});

function TheoryPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageHero
        eyebrow="05 / Theory"
        title="How a battery becomes an outlet"
        blurb="The system overview, the electrical theory of DC vs AC, and the mechanism inside the inverter that bridges them."
      />

      <Section eyebrow="System Overview" title="What a battery-powered outlet looks like">
        <Diagram src={diagOverview} alt="Battery, inverter, AC outlet system overview" caption="A — Battery → Inverter → AC Outlet" />
      </Section>

      <Section eyebrow="Electrical Theory" title="DC vs AC current — why an inverter is needed">
        <Diagram src={diagDcAc} alt="DC vs AC waveform comparison" caption="B — Waveform Comparison" />
        <p className="mt-8 max-w-3xl text-muted-foreground">
          Batteries deliver <span className="text-cyan-brand">direct current</span> (DC) — a steady
          one-way flow. Wall outlets supply <span className="text-cyan-brand">alternating current</span>{" "}
          (AC) — voltage that swings positive and negative 60 times per second. Cord-powered
          devices expect AC, so an inverter is the translator between them.
        </p>
      </Section>

      <Section eyebrow="Mechanism" title="How a power inverter works">
        <Diagram src={diagHow} alt="Inverter internal block diagram" caption="C — Internal Signal Path" />
        <ol className="mt-8 grid gap-4 font-mono text-sm md:grid-cols-4">
          {[
            ["Oscillator", "Generates a low-voltage AC switching signal."],
            ["MOSFET H-Bridge", "Chops DC into alternating pulses."],
            ["Transformer", "Steps voltage up from 12V toward 120V."],
            ["Output filter", "Smooths the wave into clean pure-sine AC."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-lg border border-border bg-surface p-4">
              <div className="text-cyan-brand">STAGE {i + 1}</div>
              <div className="mt-2 text-foreground">{t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{d}</div>
            </li>
          ))}
        </ol>
      </Section>

      <SectionNav current="/theory" />
      <SiteFooter />
    </div>
  );
}
