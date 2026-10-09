// app/properties/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";
import { Sidebar } from "../components/sidebar";
import { Icon } from "../components/icons";

const PROPERTY_TYPES = ["Villa", "Apartment", "House", "Studio", "Loft"];
const AMENITIES = ["Pool", "Garage", "Garden", "Balcony", "Furnished", "Pet Friendly"];

const PROPERTIES = [
  {
    slug: "modern-villa-ocean-view",
    tag: "For Sale",
    title: "Modern Villa with Ocean View",
    location: "Malibu, California",
    price: "$4,250,000",
    beds: 5,
    baths: 6,
    size: "4,800 sqft",
    type: "Villa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "downtown-high-rise-apartment",
    tag: "For Rent",
    title: "Downtown High-Rise Apartment",
    location: "Chicago, Illinois",
    price: "$2,650 / month",
    beds: 2,
    baths: 2,
    size: "1,150 sqft",
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "contemporary-family-home",
    tag: "For Sale",
    title: "Contemporary Family Home",
    location: "Austin, Texas",
    price: "$1,180,000",
    beds: 4,
    baths: 3,
    size: "2,900 sqft",
    type: "House",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "cozy-studio-near-park",
    tag: "For Rent",
    title: "Cozy Studio near the Park",
    location: "Brooklyn, New York",
    price: "$1,950 / month",
    beds: 1,
    baths: 1,
    size: "600 sqft",
    type: "Studio",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "lakefront-estate",
    tag: "For Sale",
    title: "Lakefront Estate",
    location: "Seattle, Washington",
    price: "$3,900,000",
    beds: 5,
    baths: 5,
    size: "5,200 sqft",
    type: "House",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "furnished-loft-midtown",
    tag: "For Rent",
    title: "Furnished Loft in Midtown",
    location: "Miami, Florida",
    price: "$2,400 / month",
    beds: 2,
    baths: 2,
    size: "1,050 sqft",
    type: "Loft",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "hillside-home-with-pool",
    tag: "For Sale",
    title: "Hillside Home with Pool",
    location: "Scottsdale, Arizona",
    price: "$1,750,000",
    beds: 4,
    baths: 4,
    size: "3,400 sqft",
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "minimalist-studio-downtown",
    tag: "For Rent",
    title: "Minimalist Studio Downtown",
    location: "Denver, Colorado",
    price: "$1,300 / month",
    beds: 1,
    baths: 1,
    size: "580 sqft",
    type: "Studio",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  },
];

export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "For Sale" | "For Rent">("All");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  const toggleType = (t: string) =>
    setSelectedTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const matchesTag = activeFilter === "All" || p.tag === activeFilter;
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.type);
      return matchesTag && matchesType;
    });
  }, [activeFilter, selectedTypes]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      {/* ---------------- Main ---------------- */}
      <main className="flex-1 px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
        {/* Top bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <button className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-foreground">
            <Icon.Pin className="h-4 w-4 text-accent" />
            New York, USA
            <Icon.Chevron className="h-4 w-4 text-muted" />
          </button>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground">
              <Icon.Key className="h-4 w-4 text-accent" />
              List Your Property
              <span className="text-accent">+</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
              <Icon.Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent">BROWSE LISTINGS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {filtered.length} Properties Found
            </h1>
            <p className="mt-2 text-sm text-muted">in New York, USA and nearby areas</p>
          </div>

          {/* Search */}
          <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 sm:w-auto">
            <Icon.Search className="h-4 w-4 shrink-0 text-accent" />
            <input
              type="text"
              placeholder="Search by location, title..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* ---------------- Filters ---------------- */}
          <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Icon.Sliders className="h-4 w-4 text-accent" />
              Filters
            </div>

            <div className="my-5 h-px bg-border" />

            {/* Sale / Rent */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Status</p>
              <div className="mt-3 inline-flex w-full rounded-full border border-border bg-background p-1">
                {(["All", "For Sale", "For Rent"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                      activeFilter === f
                        ? "bg-accent text-accent-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Price Range</p>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Min"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none"
                />
                <span className="text-muted">–</span>
                <input
                  type="text"
                  placeholder="Max"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none"
                />
              </div>
            </div>

            {/* Property type */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Property Type</p>
              <div className="mt-3 flex flex-col gap-2">
                {PROPERTY_TYPES.map((t) => (
                  <label key={t} className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(t)}
                      onChange={() => toggleType(t)}
                      className="h-4 w-4 rounded border-border accent-[var(--accent)]"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            {/* Beds & baths */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Beds &amp; Baths</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Any", "1+", "2+", "3+", "4+", "5+"].map((v) => (
                  <button
                    key={v}
                    className="rounded-lg border border-border py-2 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Amenities</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {AMENITIES.map((a) => (
                  <span
                    key={a}
                    className="cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-foreground"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <button className="mt-7 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">
              Apply Filters
            </button>
            <button
              onClick={() => {
                setActiveFilter("All");
                setSelectedTypes([]);
              }}
              className="mt-2 w-full rounded-xl border border-border py-3 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            >
              Clear All
            </button>
          </aside>

          {/* ---------------- Results ---------------- */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> results
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      view === "grid" ? "bg-accent/15 text-accent" : "text-muted"
                    }`}
                  >
                    <Icon.Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      view === "list" ? "bg-accent/15 text-accent" : "text-muted"
                    }`}
                  >
                    <Icon.List className="h-4 w-4" />
                  </button>
                </div>
                <select className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground focus:outline-none">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div
              className={`mt-6 grid gap-5 ${
                view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filtered.map((p) => (
                <CometCard key={p.slug}>
                  <Link href={`/properties/${p.slug}`}>
                    <article
                      className={`overflow-hidden rounded-2xl border border-border bg-surface cursor-pointer ${
                        view === "list" ? "flex flex-col sm:flex-row" : ""
                      }`}
                      style={{ transformStyle: "preserve-3d", transform: "none", opacity: 1 }}
                    >
                      <div
                        className={`relative bg-surface-strong ${
                          view === "list" ? "aspect-[4/3] sm:w-72 sm:shrink-0" : "aspect-[4/3] w-full"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                        <span
                          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                            p.tag === "For Sale" ? "bg-accent-alt text-white" : "bg-emerald-600 text-white"
                          }`}
                        >
                          {p.tag}
                        </span>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
                        >
                          <Icon.Heart className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="text-[15px] font-semibold leading-snug">{p.title}</h3>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                          <Icon.Pin className="h-3.5 w-3.5" />
                          {p.location}
                        </p>
                        <p className="mt-3 text-lg font-semibold text-accent">{p.price}</p>
                        <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <Icon.Bed className="h-3.5 w-3.5" /> {p.beds} Beds
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon.Bath className="h-3.5 w-3.5" /> {p.baths} Baths
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon.Ruler className="h-3.5 w-3.5" /> {p.size}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </CometCard>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted">
                No properties match these filters. Try clearing a few.
              </div>
            )}

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-white/5">
                <Icon.Chevron className="h-4 w-4 rotate-90" />
              </button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    n === 1 ? "bg-accent text-accent-foreground" : "border border-border text-muted hover:bg-white/5"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-white/5">
                <Icon.Chevron className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}