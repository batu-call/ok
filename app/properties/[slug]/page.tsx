// app/properties/[slug]/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "../../components/sidebar";
import { Icon } from "../../components/icons";

const GALLERY = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
];

const AMENITIES = [
  "Private Pool",
  "2-Car Garage",
  "Smart Home System",
  "Ocean-facing Terrace",
  "Wine Cellar",
  "Home Theater",
  "Solar Panels",
  "Gated Community",
];

const SIMILAR = [
  {
    slug: "lakefront-estate",
    title: "Lakefront Estate",
    location: "Seattle, Washington",
    price: "$3,900,000",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
  },
  {
    slug: "hillside-home-with-pool",
    title: "Hillside Home with Pool",
    location: "Scottsdale, Arizona",
    price: "$1,750,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=700&q=80",
  },
  {
    slug: "contemporary-family-home",
    title: "Contemporary Family Home",
    location: "Austin, Texas",
    price: "$1,180,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
  },
];

export default function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Şimdilik sabit veri gösteriliyor. Gerçek projede burada
  // `params.slug` ile veritabanından/API'den ilgili ilanı çekeceksin,
  // ör: const property = await getPropertyBySlug(params.slug)
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      {/* ---------------- Main ---------------- */}
      <main className="flex-1 px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
        {/* Top bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/properties"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Icon.Chevron className="h-4 w-4 rotate-90" />
            Back to results
          </Link>

          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
              <Icon.Share className="h-4 w-4" />
            </button>
            <button
              onClick={() => setSaved((s) => !s)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                saved ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface"
              }`}
            >
              <Icon.Heart className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-accent-alt px-3 py-1 text-xs font-semibold text-white">For Sale</span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Modern Villa with Ocean View
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <Icon.Pin className="h-4 w-4 text-accent" />
              7281 Coastline Drive, Malibu, California
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-accent">$4,250,000</p>
            <p className="text-xs text-muted">≈ $885 / sqft</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr]">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-surface-strong sm:aspect-auto sm:h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={GALLERY[activeImage]} alt="Property view" className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-2 sm:h-[420px]">
            {GALLERY.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImage(i)}
                className={`overflow-hidden rounded-xl border-2 transition-colors ${
                  activeImage === i ? "border-accent" : "border-transparent"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-4">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Icon.Bed className="h-5 w-5 text-accent" />
                <p className="text-sm font-semibold">5 Beds</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Icon.Bath className="h-5 w-5 text-accent" />
                <p className="text-sm font-semibold">6 Baths</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Icon.Ruler className="h-5 w-5 text-accent" />
                <p className="text-sm font-semibold">4,800 sqft</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Icon.Calendar className="h-5 w-5 text-accent" />
                <p className="text-sm font-semibold">Built 2021</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">About this property</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Perched above the Malibu coastline, this villa pairs clean architectural
                lines with uninterrupted ocean views. Floor-to-ceiling glass opens the main
                living areas onto a cantilevered terrace, while the lower level houses a
                private spa, wine cellar, and home theater. Finished with white oak flooring,
                honed limestone counters, and integrated smart-home controls throughout.
              </p>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {AMENITIES.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Icon.Check className="h-3 w-3" />
                    </span>
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Location</h2>
              <div className="mt-4 flex h-56 items-center justify-center rounded-2xl border border-border bg-surface-strong text-sm text-muted">
                Map preview
              </div>
            </div>
          </div>

          {/* Sidebar: agent + contact */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Icon.User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Elena Martinez</p>
                  <p className="text-xs text-muted">Senior Listing Agent</p>
                </div>
              </div>

              <div className="my-5 h-px bg-border" />

              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">
                  <Icon.Phone className="h-4 w-4" />
                  Call Agent
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5">
                  <Icon.Mail className="h-4 w-4" />
                  Send Message
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-sm font-semibold">Request a Tour</h3>
              <p className="mt-1 text-xs text-muted">Pick a time that works for you.</p>
              <div className="mt-4 flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none"
                />
                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none"
                />
                <button className="mt-1 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">
                  Schedule Tour
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">Similar Properties</h2>
            <button className="flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              View All
              <Icon.ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {SIMILAR.map((p) => (
              <Link key={p.slug} href={`/properties/${p.slug}`}>
                <article className="overflow-hidden rounded-2xl border border-border bg-surface cursor-pointer">
                  <div className="aspect-[4/3] w-full bg-surface-strong">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                      <Icon.Pin className="h-3.5 w-3.5" />
                      {p.location}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-accent">{p.price}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}