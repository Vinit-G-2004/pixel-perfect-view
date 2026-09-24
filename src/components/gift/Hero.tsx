import { Gift, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-resort.jpg";
import voucherImg from "@/assets/g-voucher.jpg";
import { useParallax } from "@/hooks/use-reveal";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { whatsappLink } from "@/lib/site-config";

export function Hero() {
  const y = useParallax(0.22);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden tilt-stage">
      <div
        className="absolute inset-0 -z-20 scale-110"
        style={{ transform: `translate3d(0, ${y}px, 0) scale(1.12)` }}
      >
        <img
          src={heroImg}
          alt="De LUSH Resort at golden hour"
          width={1920}
          height={1200}
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      />

      <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center gap-12 px-6 py-28 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1">
          <Reveal>
            <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-[0.28em] text-primary-foreground uppercase">
              <Sparkles className="size-3.5" />
              De LUSH Resort · Bavdhan, Pune
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-7 text-5xl leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
              Gifting an
              <span className="text-gold-gradient block italic">Experience</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 max-w-lg text-base/relaxed text-primary-foreground/85">
              Some gifts are unwrapped. Ours are remembered. Give someone you love a
              slow morning, a candlelit dinner and a night away — just twenty minutes
              from the city.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#packages"
                className="bg-gradient-gold shadow-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Gift className="size-4" />
                Explore gift packages
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="glass-dark inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                Talk to us on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={260} className="flex-1">
          <TiltCard max={11} className="animate-float-slow mx-auto max-w-sm">
            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-3">
              <div
                className="animate-ribbon pointer-events-none absolute -top-16 -right-16 size-52 rounded-full blur-3xl"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              />
              <img
                src={voucherImg}
                alt="De LUSH gift voucher presentation box"
                width={1024}
                height={1280}
                loading="lazy"
                className="aspect-4/5 w-full rounded-[1.6rem] object-cover"
              />
              <div className="tilt-layer relative px-4 pt-5 pb-4">
                <p className="text-[0.65rem] tracking-[0.34em] text-muted-foreground uppercase">
                  The De LUSH Gift Voucher
                </p>
                <p className="font-display mt-2 text-2xl">
                  Wrapped in gold, opened in memory
                </p>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
