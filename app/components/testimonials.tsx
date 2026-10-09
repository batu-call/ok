// app/components/testimonials.tsx
import { Icon } from "./icons";

const REVIEWS = [
  {
    name: "Sarah Mitchell",
    role: "Bought a home in Austin",
    quote:
      "The whole process felt effortless. I found my dream home in two weeks and the agent was incredibly responsive.",
    rating: 5,
    initials: "SM",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "James Carter",
    role: "Rented an apartment in NYC",
    quote:
      "Verified listings meant zero surprises. Exactly what was shown is what I moved into.",
    rating: 5,
    initials: "JC",
    color: "bg-sky-100 text-sky-700",
  },
  {
    name: "Elena Rodriguez",
    role: "Sold a property in Miami",
    quote:
      "Listing my property took minutes and I had serious offers within days. Highly recommend.",
    rating: 4,
    initials: "ER",
    color: "bg-amber-100 text-amber-700",
  },
];

export function Testimonials() {
  return (
    <section className="mt-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-md">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent">
          TESTIMONIALS
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          What our clients say.
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6"
          >
            <div>
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon.Heart
                    key={i}
                    className={`h-4 w-4 ${
                      i < r.rating ? "opacity-100" : "opacity-20"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">&ldquo;{r.quote}&rdquo;</p>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${r.color}`}
                aria-hidden="true"
              >
                {r.initials}
              </div>
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-muted">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}