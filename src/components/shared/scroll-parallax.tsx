"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type ScrollParallaxProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

export function ScrollParallax({ children, className, speed = 0.08 }: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = (rect.top + rect.height * 0.5 - viewport * 0.5) / viewport;
      const offset = Math.max(-26, Math.min(26, progress * 100 * speed));
      node.style.transform = `translate3d(0, ${offset}px, 0)`;
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("transition-transform duration-300 ease-out will-change-transform", className)}>
      {children}
    </div>
  );
}
