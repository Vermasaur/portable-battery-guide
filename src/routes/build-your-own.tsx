import { createFileRoute } from "@tanstack/react-router";
import diag1 from "@/assets/diy-step-1-plan.png";
import diag2 from "@/assets/diy-step-2-battery.png";
import diag3 from "@/assets/diy-step-3-inverter.png";
import diag4 from "@/assets/diy-step-4-aux.png";
import diag5 from "@/assets/diy-step-5-enclosure.png";
import diag6 from "@/assets/diy-step-6-test.png";
import diag7 from "@/assets/diy-step-7-finished.png";
import { SiteHeader, SiteFooter, PageHero, Section, Diagram, SectionNav } from "@/components/site-chrome";

export const Route = createFileRoute("/build-your-own")({
  component: BuildYourOwnPage,
  head: () => ({
    meta: [
      { title: "Build Your Own — Battery Powered Outlets" },
      {
        name: "description",
        content:
          "Step-by-step DIY guide to build a 300W pure-sine portable AC outlet from scratch: LiFePO4 pack, SPWM inverter, MPPT solar input, USB-C PD, finished enclosure.",
      },
      { property: "og:title", content: "Build Your Own — Portable AC Outlet" },
      {
        property: "og:description",
        content:
          "Complete weekend DIY: cell-balanced battery pack, EGS002 SPWM inverter, MPPT solar charging, in a single rugged enclosure.",
      },
    ],
  }),
});

const steps = [
  {
    n: "1",
    title: "Plan the system and confirm the power budget",
    diagram: diag1,
    caption: "Step 1 — System block diagram",
    body: (
      <>
        <p>
          Decide what you need to run. A 300 W continuous / 600 W surge inverter handles laptops,
          fans, TVs, small power tools, and CPAP machines, but not a microwave or hair dryer. Four
          LiFePO4 cells in series give a nominal 12.8 V bus and about 1.3 kWh of energy — roughly
          4 hours at full load, or a full day for laptop + lights.
        </p>
        <p className="mt-3">
          Sketch the block diagram:{" "}
          <span className="font-mono text-cyan-brand">
            solar → MPPT → battery ← BMS → fused bus → (inverter, 12 V→5 V buck, USB-C PD)
          </span>
          . Every load taps the fused bus, never the cells directly.
        </p>
      </>
    ),
  },
  {
    n: "2",
    title: "Build the LiFePO4 battery pack",
    diagram: diag2,
    caption: "Step 2 — 4S pack with BMS",
    body: (
      <>
        <p>
          Top-balance all four cells before assembly: charge each one individually to exactly
          3.65 V with a bench supply (CC then CV until current drops below 100 mA). Skipping this
          step is the #1 reason DIY packs fail early — once series-connected, cells can never
          re-balance themselves above the BMS's narrow balance current.
        </p>
        <p className="mt-3">
          Compress the cells with end plates and threaded rod (LiFePO4 prismatics swell slightly
          when charged; manufacturer specs ~300 kgf). Connect in series with the supplied busbars
          torqued to spec (usually 6–8 N·m). Wire the BMS balance leads from B− up through B1, B2,
          B3, B+.
        </p>
        <p className="mt-3">
          Attach the BMS between the pack negative and the system negative bus. The positive goes
          straight from pack+ through the ANL fuse to the bus. Never run the positive through the
          BMS unless your model is designed for it.
        </p>
      </>
    ),
  },
  {
    n: "3",
    title: "Assemble the inverter stage",
    diagram: diag3,
    caption: "Step 3 — H-bridge + filter schematic",
    body: (
      <>
        <p>
          The EGS002 module is a drop-in SPWM controller that handles oscillator, SPWM generation,
          dead-time, soft-start, and protection. It outputs four gate signals (HO1, LO1, HO2, LO2)
          for the H-bridge. Mount it on a perfboard or a PCB cut to fit your enclosure.
        </p>
        <p className="mt-3">
          Solder eight IRFP260N MOSFETs in two parallel banks of four (two per leg of the
          H-bridge) onto the heatsink with mica insulators and thermal paste. Each gate goes
          through a 22 Ω resistor to the corresponding gate-driver output. Connect the
          drains/sources per the H-bridge schematic, with the toroidal transformer's primary
          across the bridge midpoints.
        </p>
        <p className="mt-3">
          Add the DC bus capacitors (4× 4700 µF) directly across the MOSFET supply rails with very
          short leads — long leads here cause ringing that destroys MOSFETs. The transformer
          secondary feeds the LC output filter (3 mH inductor in series, 2.2 µF X2 cap in
          parallel) and finally the GFCI outlet.
        </p>
      </>
    ),
  },
  {
    n: "4",
    title: "Wire the auxiliary outputs and charging",
    diagram: diag4,
    caption: "Step 4 — Aux outputs and MPPT charging",
    body: (
      <>
        <p>
          Tap the fused 12 V bus for: (a) the 12 V→5 V buck feeding a USB-A breakout for phone
          charging, (b) the USB-C PD module which negotiates 5/9/15/20 V for laptops, and (c) the
          inverter's own control supply. Each branch gets its own inline fuse sized to the wire
          (3 A for USB, 30 A for the inverter).
        </p>
        <p className="mt-3">
          Wire the MPPT charge controller's battery terminals to the pack (through the BMS), and
          bring the solar input to an XT60 or MC4 panel-mount connector on the enclosure.
          Configure the MPPT for LiFePO4: 14.2 V absorption, 13.6 V float, no equalization. For
          wall charging, a 14.6 V / 10 A LiFePO4-specific power brick can plug into the same XT60.
        </p>
      </>
    ),
  },
  {
    n: "5",
    title: "Build the enclosure and mount everything",
    diagram: diag5,
    caption: "Step 5 — Internal layout (cool / hot / warm zones)",
    body: (
      <>
        <p>
          Lay out hot, warm, and cold zones: battery on one side, inverter + heatsink in the
          middle (with the 80 mm fan pulling air across the fins and out a vent), control
          electronics on the cool side. Cut panel holes for the GFCI outlet, USB ports, solar
          input, voltmeter, and main power switch.
        </p>
        <p className="mt-3">
          Use 8 AWG silicone wire for everything between battery, fuse, contactor, and inverter.
          Crimp lugs with a hydraulic crimper (not pliers) and heat-shrink every joint. Keep
          AC-side wiring physically separated from low-voltage signal wiring; cross at right
          angles where they must meet.
        </p>
      </>
    ),
  },
  {
    n: "6",
    title: "First power-up and bench testing",
    diagram: diag6,
    caption: "Step 6 — Bench-test rig with scope and DMM",
    body: (
      <>
        <p>
          Before connecting the battery, do a continuity sanity check with a multimeter: no shorts
          from B+ to B−, no shorts from AC live to chassis. Then power the inverter from a
          current-limited bench supply at 12 V / 2 A. If the supply trips, you have a wiring fault
          — fix before connecting the real pack.
        </p>
        <p className="mt-3">
          With a clean bring-up, scope the AC output: you should see a 60 Hz sine at ~170 V peak,
          120 V<sub>rms</sub>, with visible 20 kHz ripple on the rising edge that the LC filter
          mostly removes. Total harmonic distortion under load should measure below 5%. Test
          progressively: 25 W bulb → 100 W laptop charger → 300 W heat gun on low. Confirm the
          GFCI trips when you press its test button.
        </p>
      </>
    ),
  },
  {
    n: "7",
    title: "Calibrate, label, and field test",
    diagram: diag7,
    caption: "Step 7 — Finished portable outlet",
    body: (
      <>
        <p>
          Trim the EGS002's output voltage pot for exactly 120 V<sub>rms</sub> at half load.
          Verify the BMS cuts off at 2.5 V/cell discharge and 3.65 V/cell charge with a known
          load and charger. Label every external port, including a "DO NOT OPEN — LITHIUM"
          warning on the lid.
        </p>
        <p className="mt-3">
          Run a real-world cycle: drain it from full to BMS cutoff with a 200 W load while
          logging temperature; the heatsink should stabilize below 60 °C with the fan running.
          Recharge from solar and from wall, confirming the MPPT reaches absorption and tapers
          correctly. You now have a portable AC outlet that works exactly like the commercial
          all-in-one stations covered elsewhere on this site — except you understand every
          electron in it.
        </p>
      </>
    ),
  },
];

const bom: Array<[string, string, string]> = [
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
];

function BuildYourOwnPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageHero
        eyebrow="06 / Build Your Own"
        title="Build your own portable AC outlet"
        blurb="A complete weekend-to-weeklong project: a 300 W pure-sine, 12 V LiFePO4 portable power station with one 120 V outlet, USB-C PD, MPPT solar input, and battery management."
      />

      <Section eyebrow="Overview" title="What you're building">
        <p className="max-w-3xl text-muted-foreground">
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
      </Section>

      <Section eyebrow="Parts List" title="Bill of materials">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-2 font-mono text-xs uppercase tracking-wider text-cyan-brand">
              <tr>
                <th className="px-4 py-3">Part</th>
                <th className="px-4 py-3">Spec</th>
                <th className="px-4 py-3">Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {bom.map(([p, s, q]) => (
                <tr key={p}>
                  <td className="px-4 py-2 text-foreground">{p}</td>
                  <td className="px-4 py-2">{s}</td>
                  <td className="px-4 py-2 font-mono">{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Step-by-Step" title="Build process">
        <div className="space-y-10">
          {steps.map((s) => (
            <div key={s.n} className="rounded-lg border border-border bg-surface p-6">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-cyan-brand">STEP {s.n}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-3 text-xl text-foreground md:text-2xl">{s.title}</h3>
              <div className="mt-5">
                <Diagram src={s.diagram} alt={`Step ${s.n}: ${s.title}`} caption={s.caption} />
              </div>
              <div className="mt-5 space-y-0 text-sm text-muted-foreground">{s.body}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-surface p-6">
          <div className="font-mono text-xs text-cyan-brand">FURTHER UPGRADES</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Swap to a 24 V or 48 V bus for higher inverter wattage with thinner wire.</li>
            <li>Add an ESP32 + INA226 for Wi-Fi telemetry of voltage, current, and SoC.</li>
            <li>
              Replace the EGS002 with a microcontroller running your own SPWM firmware for
              learning — STM32 timer-based PWM is the canonical project.
            </li>
            <li>
              Add a transfer switch so the unit can pass grid power through when plugged in and
              seamlessly invert when unplugged (true UPS behavior).
            </li>
          </ul>
        </div>
      </Section>

      <SectionNav current="/build-your-own" />
      <SiteFooter />
    </div>
  );
}
