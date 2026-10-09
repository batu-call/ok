// app/components/why-choose-us.tsx
import { Icon } from "./icons";

const STATS = [
  { label: "Verified Listings", value: "10,000+", icon: Icon.Home },
  { label: "Happy Clients", value: "5,200+", icon: Icon.Heart },
  { label: "Cities Covered", value: "35+", icon: Icon.Pin },
  { label: "Expert Agents", value: "180+", icon: Icon.Key },
];

export function WhyChooseUs() {
  return (
    <section className="mt-20 px-5 sm:px-8 lg:px-12">
      <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12">
        <div className="max-w-lg">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            WHY NEXORA
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            A platform buyers and renters trust.
          </h2>
          <p className="mt-3 text-sm text-muted">
            Every listing is verified, every agent is vetted. We make finding
            your next home simple and safe.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}