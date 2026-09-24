import { Check, Crown, Leaf, Sparkles } from "lucide-react";
import suiteImg from "@/assets/g-suite.jpg";
import coupleImg from "@/assets/g-couple.jpg";
import spaImg from "@/assets/g-spa.jpg";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { cn } from "@/lib/utils";

const packages = [
  {
    id: "pause",
    name: "DeLUSH Pause",
    price: "₹3,999",
    note: "+ taxes",
    tagline: "A quiet night away",
    image: suiteImg,
    icon: Leaf,
    features: [
      "1 night stay for two",
      "High Tea for two",
      "Breakfast the next morning",
      "Access to resort facilities",
    ],
  },
  {
    id: "afterglow",
    name: "DeLUSH Afterglow",
    price: "₹7,500",
    note: "+ taxes",
    tagline: "The full celebration",
    image: coupleImg,
    icon: Sparkles,
    badge: "Most Popular",
    features: [
      "1 night stay for two",
      "High Tea + breakfast",
      "Lunch or dinner at Mayavi",
      "Access to resort facilities",
    ],
  },
  {
    id: "topup",
    name: "DeLUSH TopUp",
    price: "Premium add-on",
    note: "on request",
    tagline: "Make it unforgettable",
    image: spaImg,
    icon: Crown,
    features: [
      "Add a curated meal experience",
      "Signature spa therapy for two",
      "Premium voucher presentation box",
      "Personalised note & surprise setup",
    ],
  },
];

export function Packages() {
  return (
    <section id="packages" className="bg-gradient-warm relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-[0.68rem] tracking-[0.34em] text-muted-foreground uppercase">
            Choose their escape
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl">
            Three ways to <span className="text-gold-gradient italic">gift a stay</span>
          </h2>
          <div className="rule-gold mx-auto mt-7 w-40" />
        </Reveal>

        <div className="tilt-stage mt-16 grid gap-8 md:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={i * 140}>
              <TiltCard
                max={8}
                className={cn(
                  "group h-full",
                  p.badge && "md:-mt-6",
                )}
              >
                <article
                  className={cn(
                    "glass-panel relative flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-shadow duration-500 group-hover:shadow-lift",
                    p.badge && "shadow-gold",
                  )}
                >
                  <div className="relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {p.badge && (
                      <span className="bg-gradient-gold absolute top-4 right-4 rounded-full px-3.5 py-1.5 text-[0.62rem] font-medium tracking-[0.2em] text-ink uppercase">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="tilt-layer flex flex-1 flex-col p-7">
                    <p.icon className="size-5 text-gold" />
                    <h3 className="mt-3 text-2xl">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.tagline}</p>

                    <p className="font-display mt-5 text-4xl text-foreground">
                      {p.price}
                      <span className="ml-2 font-sans text-xs tracking-wide text-muted-foreground">
                        {p.note}
                      </span>
                    </p>

                    <ul className="mt-6 space-y-3 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#enquire"
                      className={cn(
                        "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-transform duration-300 hover:-translate-y-0.5",
                        p.badge
                          ? "bg-gradient-gold text-ink"
                          : "border border-gold/40 bg-card/60 text-foreground hover:border-gold",
                      )}
                    >
                      Gift this
                    </a>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
