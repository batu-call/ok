// app/components/how-it-works.tsx
import { Icon } from "./icons";

const STEPS = [
  {
    step: "01",
    title: "Search",
    desc: "Filter by location, price, and property type to find your match.",
    icon: Icon.Search,
  },
  {
    step: "02",
    title: "Explore",
    desc: "Review verified listings, photos, and details from trusted agents.",
    icon: Icon.Home,
  },
  {
    step: "03",
    title: "Connect",
    desc: "Message the agent directly and schedule a visit in minutes.",
    icon: Icon.ArrowRight,
  },
];

export function HowItWorks() {
  return (
    <section className="mt-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-md">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent">
          THE PROCESS
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          How it works.
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.step}
            className="relative rounded-2xl border border-border bg-surface p-6"
          >
            <span className="text-4xl font-semibold text-border">
              {s.step}
            </span>
            <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
              <s.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}