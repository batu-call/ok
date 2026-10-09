// app/components/popular-locations.tsx
import Link from "next/link";
import { Icon } from "./icons";

const LOCATIONS = [
  {
    city: "New York",
    country: "USA",
    count: 128,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "Malibu",
    country: "California",
    count: 42,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "Miami",
    country: "Florida",
    count: 76,
    image:
      "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "Austin",
    country: "Texas",
    count: 53,
    image:
      "https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "Seattle",
    country: "Washington",
    count: 39,
    image:
      "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?auto=format&fit=crop&w=600&q=80",
  },
];

export function PopularLocations() {
  return (
    <section className="mt-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-md">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent">
          EXPLORE
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Popular Locations.
        </h2>
        <p className="mt-3 text-sm text-muted">
          Browse listings in the cities our buyers and renters love most.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {LOCATIONS.map((loc) => (
          <Link
            key={loc.city}
            href={`/properties?location=${encodeURIComponent(loc.city)}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={loc.image}
              alt={loc.city}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-sm font-semibold text-white">{loc.city}</h3>
              <p className="text-xs text-white/70">{loc.country}</p>
              <p className="mt-1 text-xs font-medium text-accent">
                {loc.count} listings
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}