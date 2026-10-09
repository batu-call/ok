// app/components/cta-banner.tsx
import Link from "next/link";
import { Icon } from "./icons";

export function CtaBanner() {
  return (
    <section className="mt-20 px-5 sm:px-8 lg:px-12">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 sm:p-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to find your{" "}
            <span className="text-accent">dream home?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Join thousands of buyers and renters who found their place with
            Nexora.
          </p>
          <Link
            href="/properties"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            <Icon.Search className="h-4 w-4" />
            Start Searching
          </Link>
        </div>
      </div>
    </section>
  );
}