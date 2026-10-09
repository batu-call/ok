// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";
import { Sidebar } from "../app/components/sidebar";
import { Icon } from "../app/components/icons";
import { PopularLocations } from "../app/components/popular-locations";
import { WhyChooseUs } from "../app/components/why-choose-us";
import { HowItWorks } from "../app/components/how-it-works";
import { Testimonials } from "../app/components/testimonials";
import { CtaBanner } from "../app/components/cta-banner";
import { Footer } from "../app/components/footer";

// --- Seamless looping video via crossfade (masks the hard restart cut) ---
function LoopingCrossfadeVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const [active, setActive] = useState<"a" | "b">("a");
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const crossfadingRef = useRef(false);
  const CROSSFADE_SECONDS = 1;

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    const handleTimeUpdate = (which: "a" | "b") => {
      if (which !== active || crossfadingRef.current) return;
      const current = which === "a" ? a : b;
      const next = which === "a" ? b : a;
      if (!current.duration || Number.isNaN(current.duration)) return;

      const remaining = current.duration - current.currentTime;
      if (remaining <= CROSSFADE_SECONDS) {
        crossfadingRef.current = true;
        next.currentTime = 0;
        next.play().catch(() => {});
        setActive(which === "a" ? "b" : "a");

        window.setTimeout(() => {
          current.pause();
          crossfadingRef.current = false;
        }, CROSSFADE_SECONDS * 1000);
      }
    };

    const onA = () => handleTimeUpdate("a");
    const onB = () => handleTimeUpdate("b");

    a.addEventListener("timeupdate", onA);
    b.addEventListener("timeupdate", onB);
    return () => {
      a.removeEventListener("timeupdate", onA);
      b.removeEventListener("timeupdate", onB);
    };
  }, [active]);

  return (
    <>
      <video
        ref={videoARef}
        src={src}
        muted
        playsInline
        autoPlay
        className={`${className ?? ""} transition-opacity duration-1000 ease-linear ${
          active === "a" ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={videoBRef}
        src={src}
        muted
        playsInline
        className={`${className ?? ""} transition-opacity duration-1000 ease-linear ${
          active === "b" ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

// --- Cycles through a property's photos, in order, while hovered ---
function PropertyImageCycler({
  images,
  alt,
  children,
}: {
  images: string[];
  alt: string;
  children?: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const startCycling = () => {
    if (images.length <= 1 || intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 700);
  };

  const stopCycling = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIndex(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
      className="relative aspect-[4/3] w-full overflow-hidden bg-surface-strong"
    >
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {children}
    </div>
  );
}


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
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

export default function Home() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollCards = (dir: "left" | "right") => {
    scrollerRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      {/* ---------------- Main ---------------- */}
      {/*
        FIX (real source of the page-wide horizontal overflow / "taşma"):
        <main> is a flex item inside the outer "flex" row with Sidebar.
        Flex items default to min-width: auto, meaning they refuse to shrink
        below their content's intrinsic (min-content) width. The Featured
        Properties carousel further down has 8 fixed-280px cards + gaps —
        a large min-content width — so <main> was refusing to shrink to the
        viewport, forcing the ENTIRE page wider and producing the bottom
        scrollbar. overflow-x-auto/hidden on the inner scroller div doesn't
        reliably fix this because the issue happens one level up, at <main>
        itself. min-w-0 is the standard, correct fix: it tells <main> it's
        allowed to shrink below its content's natural width, so its
        descendants' own overflow/scroll settings can do their job.
      */}
      <main className="min-w-0 flex-1">
        <div className="relative w-full overflow-hidden">
          <LoopingCrossfadeVideo
            src="/main_video2.mp4"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0" />

          <div className="relative z-10 px-5 py-6 sm:px-8 lg:px-12 lg:py-10 w-full">
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

            {/* Hero */}
            <section className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  Find a place
                  <br />
                  that feels like
                  <br />
                  <span className="text-accent">home.</span>
                </h1>
                <p className="mt-5 max-w-md text-muted">
                  Discover verified properties for sale or rent. Live the life you deserve.
                </p>

                <div className="mt-7 inline-flex rounded-full border border-border bg-surface p-1">
                  <Link
                    href="/properties"
                    className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-foreground"
                  >
                    Buy
                  </Link>
                  <Link
                    href="/properties?status=rent"
                    className="rounded-full px-6 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                  >
                    Rent
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Search bar */}
        {/*
          FIX (page overflow / "zoomed in" bug): this div was "ml-12 ... w-full".
          It sits directly under <main> with no matching px-* wrapper like the
          other sections have. As long as w-388 was invalid it had no real
          effect, so the bug stayed hidden. Once w-388 became a working
          w-full, "100% of main's width" PLUS a 48px left margin pushed the
          whole page wider than the viewport — hence the horizontal scrollbar
          at the bottom and the "zoomed in" look. Switched to symmetric mx-*
          spacing (matching the px-5/sm:px-8/lg:px-12 rhythm used elsewhere)
          and dropped w-full so the div's width is naturally contained
          between its margins instead of overflowing past them.
        */}
        <div className="mx-5 mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3 sm:mx-8 sm:flex-row sm:items-center lg:mx-12">
          <div className="flex flex-1 items-center justify-center gap-3 py-2">
            <Icon.Pin className="h-4 w-4 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-xs text-muted">Where do you want to live?</p>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="flex flex-1 items-center justify-center gap-3 px-3 py-2">
            <Icon.Home className="h-4 w-4 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium">Property Type</p>
              <p className="text-xs text-muted">House, Apartment, Villa...</p>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="flex flex-1 items-center justify-center gap-3 px-3 py-2">
            <Icon.Card className="h-4 w-4 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium">Price Range</p>
              <p className="text-xs text-muted">$0 - $5,000,000+</p>
            </div>
          </div>
          <Link
            href="/properties"
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            <Icon.Search className="h-4 w-4" />
            Search Properties
          </Link>
        </div>

        {/* Featured Properties */}
        <section className="mt-16 min-w-0 px-5 pb-10 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-md">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent">
                HANDPICKED FOR YOU
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Featured
                Properties.
              </h2>
              <p className="mt-3 text-sm text-muted">
                Explore our handpicked selection of the best properties.
              </p>
              <Link
                href="/properties"
                className="mt-5 flex w-fit items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
              >
                View All Properties
                <Icon.ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scrollCards("left")}
                aria-label="Scroll left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-white/5"
              >
                <Icon.Chevron className="h-4 w-4 rotate-90" />
              </button>
              <button
                onClick={() => scrollCards("right")}
                aria-label="Scroll right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-white/5"
              >
                <Icon.Chevron className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          </div>

          {/*
            FIX 1: overflow-hidden -> overflow-x-auto
              overflow-hidden completely blocked scrollBy() from doing anything,
              so the left/right arrow buttons above did nothing.
            FIX 2: w-388 -> w-full
              w-388 isn't a real Tailwind class (no arbitrary-value brackets), so it
              was silently dropped and had zero effect.
          */}
          <div
            ref={scrollerRef}
            className="mt-8 flex gap-5 overflow-x-hidden w-full snap-x snap-mandatory p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-pointer"
          >
            {PROPERTIES.map((p) => (
              <CometCard key={p.slug} className="p-1">
                <Link href={`/properties/${p.slug}`}>
                  {/*
                    FIX (blur, round 2): removed the inline
                    "transformStyle: 'preserve-3d', transform: 'none'" that
                    used to sit here. It opened a THIRD nested 3D rendering
                    context (on top of CometCard's own two), forcing the
                    browser to rasterize the image an extra time for no
                    reason — this article has no 3D children of its own that
                    need it.
                  */}
                  <article className="w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border cursor-pointer">
                    {/*
                      Photos now cycle in order on hover (see
                      PropertyImageCycler above) instead of showing a single
                      static image.
                    */}
                    <PropertyImageCycler images={p.images} alt={p.title}>
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
                    </PropertyImageCycler>

                    <div className="p-4">
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
        </section>

        <PopularLocations />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <CtaBanner />
        <Footer />
      </main>
    </div>
  );
}