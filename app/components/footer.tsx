// app/components/footer.tsx
import Link from "next/link";
import { Icon } from "./icons";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border px-5 py-12 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Icon.Home className="h-5 w-5 text-accent" />
            <span className="text-lg font-semibold tracking-tight">
              O&K
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">
            Discover verified properties for sale or rent. Live the life you
            deserve.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/properties" className="hover:text-foreground">Buy</Link></li>
            <li><Link href="/properties?status=rent" className="hover:text-foreground">Rent</Link></li>
            <li><Link href="/sell" className="hover:text-foreground">Sell</Link></li>
            <li><Link href="/properties" className="hover:text-foreground">All Properties</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link href="/help" className="hover:text-foreground">Help Center</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Newsletter</h4>
          <p className="mt-4 text-sm text-muted">
            Get new listings straight to your inbox.
          </p>
          <div className="mt-3 flex overflow-hidden rounded-xl border border-border">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted"
            />
            <button className="bg-accent px-4 text-sm font-semibold text-accent-foreground">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} O&K Real Estate. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms</Link>
        </div>
      </div>
    </footer>
  );
}