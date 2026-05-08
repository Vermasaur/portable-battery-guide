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
          one-way flow of electrons from the negative terminal to the positive terminal. Wall
          outlets supply <span className="text-cyan-brand">alternating current</span> (AC) —
          voltage that swings positive and negative 60 times per second (60 Hz in North America,
          50 Hz in most of the world). Cord-powered devices expect AC, so an inverter is the
          translator between them.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="font-mono text-xs text-cyan-brand">WHY BATTERIES ARE DC</div>
            <h3 className="mt-2 text-lg text-foreground">Chemistry only flows one way</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              A battery stores energy in a chemical reaction between two electrodes — an anode
              and a cathode — separated by an electrolyte. When the circuit closes, the reaction
              releases electrons at the anode that travel through the wire and return at the
              cathode. That reaction is inherently one-directional: electrons can only leave from
              the negative terminal.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              You cannot make a battery output AC without external switching. The cell itself has
              no concept of "alternating" — it just has a fixed voltage between two terminals
              until it discharges. This is true for every chemistry: lead-acid, NiMH, lithium-ion,
              LiFePO4, and solid-state.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="font-mono text-xs text-cyan-brand">WHY OUTLETS ARE AC</div>
            <h3 className="mt-2 text-lg text-foreground">AC wins at long distances</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              The grid runs on AC because of one fact of physics: power lost in a wire equals
              current squared times resistance (P = I²R). Doubling the voltage halves the current
              for the same power, which cuts losses by a factor of four. To send electricity
              hundreds of miles, you want very high voltage and very low current.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="text-cyan-brand">Transformers</span> can step voltage up and down
              cheaply and efficiently — but they only work with a changing magnetic field, which
              means they only work with AC. A power plant generates at ~25 kV, steps up to
              hundreds of kV for transmission, then steps back down to 120 V at your house. DC
              cannot do this with passive iron-and-copper transformers, which is why Edison's
              DC grid lost to Tesla and Westinghouse's AC grid in the 1890s.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-surface p-6">
          <div className="font-mono text-xs text-cyan-brand">THE MISMATCH</div>
          <h3 className="mt-2 text-lg text-foreground">Two systems, optimized for different jobs</h3>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            AC is optimized for <span className="text-foreground">transmission</span> — moving
            energy from a distant power plant to your wall. DC is optimized for{" "}
            <span className="text-foreground">storage</span> — holding energy in a chemical cell
            you can carry. Most modern electronics (phones, laptops, LEDs, motors with variable
            speed drives) actually run on DC internally and convert AC back to DC inside the
            device. But the wall socket — the universal interface — stayed AC because that is
            what the grid delivers. An inverter exists to bridge a DC source to that AC interface
            so any cord-powered device can plug in.
          </p>
        </div>
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
