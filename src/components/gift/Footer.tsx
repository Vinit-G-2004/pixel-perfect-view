import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { RESORT } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-ink py-16 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-wide">De LUSH Resort</p>
          <p className="mt-3 flex items-start gap-2 text-sm text-primary-foreground/70">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
            {RESORT.address}
          </p>
        </div>

        <div className="text-sm text-primary-foreground/70">
          <p className="text-[0.68rem] tracking-[0.28em] text-gold uppercase">Reach us</p>
          <p className="mt-3 flex items-center gap-2">
            <Phone className="size-4 text-gold" />
            {RESORT.phoneDisplay}
          </p>
          <p className="mt-2 flex items-center gap-2">
            <Mail className="size-4 text-gold" />
            {RESORT.email}
          </p>
        </div>

        <div className="text-sm text-primary-foreground/70">
          <p className="text-[0.68rem] tracking-[0.28em] text-gold uppercase">Follow</p>
          <div className="mt-3 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="glass-dark rounded-full p-2.5 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="glass-dark rounded-full p-2.5 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Facebook className="size-4" />
            </a>
          </div>
          <p className="mt-6 text-xs text-primary-foreground/55">{RESORT.validity}</p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-6 text-xs text-primary-foreground/45">
        © {new Date().getFullYear()} De LUSH Resort, Bavdhan, Pune. All rights reserved.
      </div>
    </footer>
  );
}
