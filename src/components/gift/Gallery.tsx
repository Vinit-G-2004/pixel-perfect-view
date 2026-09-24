import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import suite from "@/assets/g-suite.jpg";
import dining from "@/assets/g-dining.jpg";
import spa from "@/assets/g-spa.jpg";
import hightea from "@/assets/g-hightea.jpg";
import voucher from "@/assets/g-voucher.jpg";
import pool from "@/assets/g-pool.jpg";
import couple from "@/assets/g-couple.jpg";
import breakfast from "@/assets/g-breakfast.jpg";
import garden from "@/assets/g-garden.jpg";
import hero from "@/assets/hero-resort.jpg";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { cn } from "@/lib/utils";

const images = [
  { src: suite, caption: "Suites dressed for the occasion", span: "md:row-span-2" },
  { src: dining, caption: "Dinner at Mayavi", span: "" },
  { src: hightea, caption: "High Tea on the terrace", span: "" },
  { src: spa, caption: "Signature spa therapies", span: "md:row-span-2" },
  { src: hero, caption: "Golden hour by the pool", span: "md:col-span-2" },
  { src: couple, caption: "Candlelit celebrations", span: "" },
  { src: breakfast, caption: "Breakfast, unhurried", span: "" },
  { src: voucher, caption: "The gift voucher box", span: "" },
  { src: pool, caption: "Afternoons by the water", span: "md:col-span-2" },
  { src: garden, caption: "Evenings on the lawn", span: "" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % images.length)),
    [],
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-[0.68rem] tracking-[0.34em] text-muted-foreground uppercase">
            A look inside
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl">
            What your gift <span className="text-gold-gradient italic">includes</span>
          </h2>
          <div className="rule-gold mx-auto mt-7 w-40" />
        </Reveal>

        <div className="tilt-stage mt-14 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((img, i) => (
            <Reveal key={img.caption} delay={(i % 3) * 110} className={cn("h-full", img.span)}>
              <TiltCard
                as="button"
                max={7}
                onClick={() => setOpen(i)}
                ariaLabel={`Open ${img.caption}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl shadow-soft"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, oklch(0.22 0.03 45 / 0.75))",
                  }}
                />
                <span className="pointer-events-none absolute bottom-4 left-4 translate-y-3 text-left text-sm text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.caption}
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4 backdrop-blur-md animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (dx < -50) next();
            if (dx > 50) prev();
            touchX.current = null;
          }}
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-5 right-5 rounded-full p-3 text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <X className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="glass-dark absolute left-4 rounded-full p-3 text-primary-foreground sm:left-8"
          >
            <ChevronLeft className="size-6" />
          </button>
          <figure
            className="max-h-[85svh] max-w-4xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[open].src}
              alt={images[open].caption}
              className="max-h-[75svh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm tracking-wide text-primary-foreground/80">
              {images[open].caption} · {open + 1} / {images.length}
            </figcaption>
          </figure>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="glass-dark absolute right-4 rounded-full p-3 text-primary-foreground sm:right-8"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  );
}
