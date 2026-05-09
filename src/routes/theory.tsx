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

      <Section eyebrow="DIY Build" title="Build your own portable AC outlet — start to finish">
        <p className="max-w-3xl text-muted-foreground">
          A complete weekend-to-weeklong project: a 300 W pure-sine, 12 V LiFePO4 portable power
          station with one 120 V outlet, USB-C PD, MPPT solar input, and battery management.
          Budget roughly $250–$400 depending on the cell deal you find. This is a real working
          design, not a toy — but it requires comfort with soldering, basic electronics, and
          respect for high-voltage AC.
        </p>

        <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-5 text-sm">
          <div className="font-mono text-xs uppercase tracking-widest text-destructive">⚠ Safety first</div>
          <p className="mt-2 text-muted-foreground">
            Lithium cells can vent flames if shorted or overcharged. The AC side carries 170 V
            peak and can kill you. Always fuse the battery, never work on the AC side while the
            inverter is powered, and test outdoors on a fire-safe surface during first power-up.
            If you have not soldered before, build a smaller 5 V USB power bank first.
          </p>
        </div>

        <h3 className="mt-12 text-2xl font-semibold">Bill of materials</h3>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-2 font-mono text-xs uppercase tracking-wider text-cyan-brand">
              <tr>
                <th className="px-4 py-3">Part</th>
                <th className="px-4 py-3">Spec</th>
                <th className="px-4 py-3">Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["LiFePO4 cell", "EVE LF105 / 3.2 V 105 Ah, grade A", "4"],
                ["BMS", "JBD/Daly 4S 100 A LiFePO4 with Bluetooth", "1"],
                ["Inverter board", "EGS002 SPWM controller + IR2110 drivers", "1"],
                ["Power MOSFETs", "IRFP260N (low-side) / IRF3205 acceptable", "8"],
                ["Toroidal transformer", "12 V → 120 V, 500 VA", "1"],
                ["Output inductor", "3 mH, 5 A, powdered-iron toroid", "1"],
                ["X2 film capacitor", "2.2 µF / 275 VAC", "1"],
                ["DC bus capacitors", "4700 µF / 25 V low-ESR", "4"],
                ["DC-DC buck", "12 V → 5 V 3 A for control + USB-A", "1"],
                ["USB-C PD module", "20 V / 3 A trigger + protection", "1"],
                ["MPPT solar charge controller", "Victron 75/15 or Renogy Wanderer 10 A", "1"],
                ["NEMA 5-15R outlet", "Hospital-grade with built-in GFCI", "1"],
                ["DC fuse + holder", "ANL 60 A on battery positive", "1"],
                ["Main contactor / switch", "60 A latching relay or rocker", "1"],
                ["Aluminum heatsink", "100 × 80 × 25 mm finned", "1"],
                ["80 mm 12 V fan", "Thermistor controlled", "1"],
                ["Enclosure", "Pelican 1450 or equivalent ABS toolbox", "1"],
                ["Wiring", "8 AWG silicone (battery), 14 AWG (AC), 22 AWG (signal)", "—"],
              ].map(([p, s, q]) => (
                <tr key={p}>
                  <td className="px-4 py-2 text-foreground">{p}</td>
                  <td className="px-4 py-2">{s}</td>
                  <td className="px-4 py-2 font-mono">{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-12 text-2xl font-semibold">Step-by-step build</h3>

        {[
          {
            n: "1",
            title: "Plan the system and confirm the power budget",
            body: (
              <>
                <p>
                  Decide what you need to run. A 300 W continuous / 600 W surge inverter handles
                  laptops, fans, TVs, small power tools, and CPAP machines, but not a microwave
                  or hair dryer. Four LiFePO4 cells in series give a nominal 12.8 V bus and
                  about 1.3 kWh of energy — roughly 4 hours at full load, or a full day for
                  laptop + lights.
                </p>
                <p className="mt-3">
                  Sketch the block diagram: <span className="font-mono text-cyan-brand">solar
                  → MPPT → battery ← BMS → fused bus → (inverter, 12 V→5 V buck, USB-C PD)</span>.
                  Every load taps the fused bus, never the cells directly.
                </p>
              </>
            ),
          },
          {
            n: "2",
            title: "Build the LiFePO4 battery pack",
            body: (
              <>
                <p>
                  Top-balance all four cells before assembly: charge each one individually to
                  exactly 3.65 V with a bench supply (CC then CV until current drops below
                  100 mA). Skipping this step is the #1 reason DIY packs fail early — once
                  series-connected, cells can never re-balance themselves above the BMS's narrow
                  balance current.
                </p>
                <p className="mt-3">
                  Compress the cells with end plates and threaded rod (LiFePO4 prismatics swell
                  slightly when charged; manufacturer specs ~300 kgf). Connect in series with
                  the supplied busbars torqued to spec (usually 6–8 N·m). Wire the BMS balance
                  leads from B− up through B1, B2, B3, B+.
                </p>
                <p className="mt-3">
                  Attach the BMS between the pack negative and the system negative bus. The
                  positive goes straight from pack+ through the ANL fuse to the bus. Never run
                  the positive through the BMS unless your model is designed for it.
                </p>
              </>
            ),
          },
          {
            n: "3",
            title: "Assemble the inverter stage",
            body: (
              <>
                <p>
                  The EGS002 module is a drop-in SPWM controller that handles oscillator, SPWM
                  generation, dead-time, soft-start, and protection. It outputs four gate signals
                  (HO1, LO1, HO2, LO2) for the H-bridge. Mount it on a perfboard or a PCB cut to
                  fit your enclosure.
                </p>
                <p className="mt-3">
                  Solder eight IRFP260N MOSFETs in two parallel banks of four (two per leg of the
                  H-bridge) onto the heatsink with mica insulators and thermal paste. Each gate
                  goes through a 22 Ω resistor to the corresponding gate-driver output. Connect
                  the drains/sources per the H-bridge schematic, with the toroidal transformer's
                  primary across the bridge midpoints.
                </p>
                <p className="mt-3">
                  Add the DC bus capacitors (4× 4700 µF) directly across the MOSFET supply rails
                  with very short leads — long leads here cause ringing that destroys MOSFETs.
                  The transformer secondary feeds the LC output filter (3 mH inductor in series,
                  2.2 µF X2 cap in parallel) and finally the GFCI outlet.
                </p>
              </>
            ),
          },
          {
            n: "4",
            title: "Wire the auxiliary outputs and charging",
            body: (
              <>
                <p>
                  Tap the fused 12 V bus for: (a) the 12 V→5 V buck feeding a USB-A breakout for
                  phone charging, (b) the USB-C PD module which negotiates 5/9/15/20 V for
                  laptops, and (c) the inverter's own control supply. Each branch gets its own
                  inline fuse sized to the wire (3 A for USB, 30 A for the inverter).
                </p>
                <p className="mt-3">
                  Wire the MPPT charge controller's battery terminals to the pack (through the
                  BMS), and bring the solar input to an XT60 or MC4 panel-mount connector on the
                  enclosure. Configure the MPPT for LiFePO4: 14.2 V absorption, 13.6 V float, no
                  equalization. For wall charging, a 14.6 V / 10 A LiFePO4-specific power
                  brick can plug into the same XT60.
                </p>
              </>
            ),
          },
          {
            n: "5",
            title: "Build the enclosure and mount everything",
            body: (
              <>
                <p>
                  Lay out hot, warm, and cold zones: battery on one side, inverter + heatsink in
                  the middle (with the 80 mm fan pulling air across the fins and out a vent),
                  control electronics on the cool side. Cut panel holes for the GFCI outlet, USB
                  ports, solar input, voltmeter, and main power switch.
                </p>
                <p className="mt-3">
                  Use 8 AWG silicone wire for everything between battery, fuse, contactor, and
                  inverter. Crimp lugs with a hydraulic crimper (not pliers) and heat-shrink
                  every joint. Keep AC-side wiring physically separated from low-voltage signal
                  wiring; cross at right angles where they must meet.
                </p>
              </>
            ),
          },
          {
            n: "6",
            title: "First power-up and bench testing",
            body: (
              <>
                <p>
                  Before connecting the battery, do a continuity sanity check with a multimeter:
                  no shorts from B+ to B−, no shorts from AC live to chassis. Then power the
                  inverter from a current-limited bench supply at 12 V / 2 A. If the supply
                  trips, you have a wiring fault — fix before connecting the real pack.
                </p>
                <p className="mt-3">
                  With a clean bring-up, scope the AC output: you should see a 60 Hz sine at
                  ~170 V peak, 120 V<sub>rms</sub>, with visible 20 kHz ripple on the rising
                  edge that the LC filter mostly removes. Total harmonic distortion under load
                  should measure below 5%. Test progressively: 25 W bulb → 100 W laptop charger
                  → 300 W heat gun on low. Confirm the GFCI trips when you press its test
                  button.
                </p>
              </>
            ),
          },
          {
            n: "7",
            title: "Calibrate, label, and field test",
            body: (
              <>
                <p>
                  Trim the EGS002's output voltage pot for exactly 120 V<sub>rms</sub> at half
                  load. Verify the BMS cuts off at 2.5 V/cell discharge and 3.65 V/cell charge
                  with a known load and charger. Label every external port, including a "DO NOT
                  OPEN — LITHIUM" warning on the lid.
                </p>
                <p className="mt-3">
                  Run a real-world cycle: drain it from full to BMS cutoff with a 200 W load
                  while logging temperature; the heatsink should stabilize below 60 °C with the
                  fan running. Recharge from solar and from wall, confirming the MPPT reaches
                  absorption and tapers correctly. You now have a portable AC outlet that works
                  exactly like the commercial all-in-one stations covered elsewhere on this
                  site — except you understand every electron in it.
                </p>
              </>
            ),
          },
        ].map((s) => (
          <div key={s.n} className="mt-6 rounded-lg border border-border bg-surface p-6">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-cyan-brand">STEP {s.n}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h4 className="mt-3 text-xl text-foreground">{s.title}</h4>
            <div className="mt-3 space-y-0 text-sm text-muted-foreground">{s.body}</div>
          </div>
        ))}

        <div className="mt-10 rounded-lg border border-border bg-surface p-6">
          <div className="font-mono text-xs text-cyan-brand">FURTHER UPGRADES</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Swap to a 24 V or 48 V bus for higher inverter wattage with thinner wire.</li>
            <li>Add an ESP32 + INA226 for Wi-Fi telemetry of voltage, current, and SoC.</li>
            <li>Replace the EGS002 with a microcontroller running your own SPWM firmware for
              learning — STM32 timer-based PWM is the canonical project.</li>
            <li>Add a transfer switch so the unit can pass grid power through when plugged in
              and seamlessly invert when unplugged (true UPS behavior).</li>
          </ul>
        </div>
      </Section>

      <SectionNav current="/theory" />
      <SiteFooter />
    </div>
  );
}
