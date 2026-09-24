import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  onClick?: () => void;
  as?: "div" | "button";
  ariaLabel?: string;
}

/** 3D tilt-on-hover wrapper driven by pointer position. */
export function TiltCard({
  children,
  className,
  max = 9,
  onClick,
  as = "div",
  ariaLabel,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement & HTMLButtonElement>(null);

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tilt-y", `${px * max * 2}deg`);
    el.style.setProperty("--tilt-x", `${-py * max * 2}deg`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--tilt-x", "0deg");
  };

  const Tag = as;

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn("tilt-card", className)}
    >
      {children}
    </Tag>
  );
}
