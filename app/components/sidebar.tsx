// components/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Icon.Home },
  { label: "Buy", href: "/properties", icon: Icon.Home },
  { label: "Rent", href: "/properties?status=rent", icon: Icon.Home },
  { label: "Sell", href: "/sell", icon: Icon.Sell },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-64 shrink-0 flex-col justify-between border-r border-border bg-surface px-6 py-8">
      <div>
        <div className="mb-10 flex flex-col items-start">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold tracking-wide text-foreground"
          >
            <Icon.Home className="h-6 w-6 text-accent" />
            O&amp;K
          </Link>
          <span className="mt-0.5 text-[11px] tracking-[0.25em] text-muted">
            REAL ESTATE
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, href, icon: ItemIcon }) => {
            // "/properties" hem Buy hem Rent linkine karşılık geldiği için
            // query string'i atıp path'i karşılaştırıyoruz.
            const isActive = pathname === href.split("?")[0] && !href.includes("rent");
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <ItemIcon className="h-[18px] w-[18px]" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="my-6 h-px bg-border" />

        <nav className="flex flex-col gap-1">
          <button className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground">
            <Icon.Heart className="h-[18px] w-[18px]" />
            Favorites
          </button>
          <button className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground">
            <Icon.Mail className="h-[18px] w-[18px]" />
            Messages
          </button>
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 text-sm text-muted">
          <a href="#" className="transition-colors hover:text-foreground">About Us</a>
          <a href="#" className="transition-colors hover:text-foreground">Help Center</a>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/5">
          Sign In
          <Icon.User className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}