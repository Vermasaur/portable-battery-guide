import { createFileRoute } from "@tanstack/react-router";
import diagSmall from "@/assets/diagram-small-batteries.png";
import diagDcAc from "@/assets/diagram-dc-vs-ac.png";
import diagHow from "@/assets/diagram-how-it-works.png";
import { SiteHeader, SiteFooter, PageHero, Section, Diagram, SectionNav } from "@/components/site-chrome";

export const Route = createFileRoute("/lightweight")({
  component: LightweightPage,
  head: () => ({
    meta: [
      { title: "Lightweight Inverter Setups — Battery Powered Outlets" },
      {
        name: "description",
        content:
          "Small batteries paired with mini inverters: 18650 packs, USB-C power banks, SLA, and RC LiPo for short, low-power AC runs.",
      },
    ],
  }),
});

const batteries = [
  ["18650 Li-ion Pack", "11.1V (3S)", "~2–3 Ah", "DIY pack with BMS. Powers a laptop charger or LED lamp for 30–60 min.", "https://www.amazon.com/s?k=18650+battery+pack+3s+bms"],
  ["USB-C Power Bank w/ 12V DC out", "12V", "20,000–27,000 mAh", "Plug-and-play. Run a 100W mini inverter for ~30 min — phone, router, small fan.", "https://www.amazon.com/s?k=power+bank+12v+dc+output"],
  ["Sealed Lead-Acid 12V 7Ah", "12V", "7 Ah", "Cheap, heavy for its size. Good for ~20 min at 100W. Common in alarm systems.", "https://www.amazon.com/s?k=sealed+lead+acid+battery+12v+7ah"],
  ["RC LiPo 3S", "11.1V", "2–5 Ah", "Very light, high discharge. Short bursts (10–20 min) — handle with care.", "https://www.amazon.com/s?k=rc+lipo+battery+3s+11.1v"],
] as const;

function LightweightPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageHero
        eyebrow="01 / Lightweight Setups"
        title="Small batteries for short, low-power runs"
        blurb="Phones, lamps, routers, fans, and laptop chargers — pair a small battery with a 100–150W mini inverter for portable AC anywhere."
      />

      <Section eyebrow="Theory" title="DC vs AC — why an inverter is needed">
        <Diagram src={diagDcAc} alt="DC vs AC waveforms" caption="A — Waveform Comparison" />
      </Section>

      <Section eyebrow="Mechanism" title="How a small inverter works">
        <Diagram src={diagHow} alt="Inverter internal block diagram" caption="B — Internal Signal Path" />
      </Section>

      <Section eyebrow="Batteries" title="Small batteries that pair with mini inverters">
        <Diagram src={diagSmall} alt="Small portable batteries" caption="C — Small Battery → Mini Inverter" />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {batteries.map(([name, v, cap, note, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-cyan-brand"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-foreground">{name}</div>
                <div className="font-mono text-xs text-cyan-brand">{v} · {cap} ↗</div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{note}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="Plan" title="The 4-step pairing plan">
        <ol className="grid gap-4 md:grid-cols-4">
          {[
            ["Pick a 100–150W mini inverter", "Cigarette-plug style, accepts 11–15V DC."],
            ["Match voltage", "Battery must sit in the 11–15V window (3S Li-ion or 12V SLA)."],
            ["Check current draw", "Watts ÷ 12V = Amps. A 60W laptop ≈ 5A from the battery."],
            ["Estimate runtime", "Battery Ah ÷ Amps ≈ hours. 7Ah ÷ 5A ≈ 1.4 h (derate ~70%)."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-lg border border-border bg-surface p-4">
              <div className="font-mono text-xs text-cyan-brand">STEP {i + 1}</div>
              <div className="mt-2 text-sm text-foreground">{t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{d}</div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl font-mono text-xs text-muted-foreground">
          <span className="text-cyan-brand">Caution:</span> never connect a single 3.7V cell directly
          to a 12V inverter, and always use a battery with a BMS or proper fuse.
        </p>
      </Section>

      <SectionNav current="/lightweight" />
      <SiteFooter />
    </div>
  );
}
