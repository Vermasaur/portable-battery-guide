import { createFileRoute, Link } from "@tanstack/react-router";
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
        <p className="mt-8 max-w-3xl text-muted-foreground">
          Inside every inverter, the same four-stage signal path turns a flat DC voltage into a
          clean 60 Hz sine wave. Cheap inverters cut corners on stages 1 and 4 and produce a
          "modified sine" (really a stepped square wave). Pure-sine inverters do all four stages
          carefully.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="font-mono text-xs text-cyan-brand">STAGE 1 — OSCILLATOR / PWM CONTROLLER</div>
            <h3 className="mt-2 text-lg text-foreground">Generate the timing signal</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              A small chip (commonly an SG3525, EGS002, or a microcontroller like an STM32 or
              ATmega) produces a low-voltage logic-level waveform that tells the power stage when
              to switch. For a pure-sine output, this stage uses{" "}
              <span className="text-cyan-brand">sinusoidal pulse-width modulation (SPWM)</span>:
              a high-frequency carrier (15–25 kHz) whose duty cycle is varied along a 60 Hz sine
              reference. The wider the pulse, the higher the instantaneous voltage the filter
              will reconstruct.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              This stage also handles dead-time insertion (a few hundred nanoseconds where both
              high-side and low-side switches are off, to prevent shoot-through), feedback from
              the output for voltage regulation, and shutdown logic for overcurrent, overtemp,
              and undervoltage lockout.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="font-mono text-xs text-cyan-brand">STAGE 2 — MOSFET H-BRIDGE</div>
            <h3 className="mt-2 text-lg text-foreground">Chop DC into alternating pulses</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Four power MOSFETs (e.g. IRF3205 for 12 V, IRFP260 for higher buses) are arranged
              so that closing the diagonal pair Q1+Q4 sends current through the load in one
              direction, and closing Q2+Q3 reverses it. By alternating these pairs at the SPWM
              rate, the bridge produces a high-frequency train of ±V<sub>bus</sub> pulses whose
              average follows the sine reference.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              MOSFETs need gate drivers (IR2110, IR2184) because the high-side gate must be
              driven several volts above the bus rail — a bootstrap capacitor charges through a
              diode while the low-side switch is on, then floats up to drive the high-side gate.
              Heatsinking matters: each MOSFET dissipates conduction losses (I²·R<sub>DS(on)</sub>)
              plus switching losses proportional to frequency.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="font-mono text-xs text-cyan-brand">STAGE 3 — TRANSFORMER</div>
            <h3 className="mt-2 text-lg text-foreground">Step the voltage up</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              A 12 V battery cannot feed a 120 V<sub>rms</sub> outlet directly — the peak of a
              120 V<sub>rms</sub> sine is ±170 V. Two architectures solve this. Low-frequency
              (LF) inverters use a heavy iron-core 60 Hz transformer (turns ratio about 1:14) on
              the H-bridge output; reliable, tolerates surge loads well, but bulky.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              High-frequency (HF) inverters add a first stage that boosts DC to ~170 V using a
              small ferrite-core transformer at 50–100 kHz, then runs a second H-bridge directly
              at the high-voltage DC bus. Lighter and cheaper, but less surge-tolerant. Either
              way, the transformer also provides{" "}
              <span className="text-cyan-brand">galvanic isolation</span> between the battery and
              the AC side, which is a safety requirement for grounded outlets.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="font-mono text-xs text-cyan-brand">STAGE 4 — LC OUTPUT FILTER</div>
            <h3 className="mt-2 text-lg text-foreground">Smooth pulses into a sine wave</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              The H-bridge output is still a chopped pulse train. A low-pass filter — a series
              inductor (typically 1–5 mH on a powdered-iron toroid) and a parallel film
              capacitor (1–10 µF X2-rated) — averages the pulses. The cutoff frequency is set
              well above 60 Hz but well below the 20 kHz switching frequency, so the sine passes
              through and the carrier is rejected.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              A feedback loop measures the actual output and adjusts the SPWM duty cycle in real
              time to keep the RMS voltage at 120 V regardless of load. The result is a clean
              sine wave with under 3% total harmonic distortion (THD) — indistinguishable from
              grid power for any device you plug in, including motors, medical equipment, and
              sensitive electronics that misbehave on modified-sine inverters.
            </p>
          </div>
        </div>
      </Section>

      {/* DIY Build moved to its own page: /build-your-own */}
      <Section eyebrow="Build It Yourself" title="Want to build one from scratch?">
        <p className="max-w-3xl text-muted-foreground">
          Now that you understand how a battery becomes an outlet, you can build one yourself. A
          complete step-by-step DIY guide — bill of materials, diagrams, safety, and bench
          testing — lives on its own page.
        </p>
        <Link
          to="/build-your-own"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-cyan-brand/40 bg-surface px-5 py-3 font-mono text-xs uppercase tracking-widest text-cyan-brand transition-colors hover:bg-cyan-brand/10"
        >
          Go to Build Your Own
          <span>→</span>
        </Link>
      </Section>

      <SectionNav current="/theory" />
      <SiteFooter />
    </div>
  );
}
