"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  blur?: number;
};

export function Reveal({ children, className, delay = 0, y = 24, scale = 0.985, blur = 6 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? "translate3d(0,0,0) scale(1)" : `translate3d(0,${y}px,0) scale(${scale})`,
        filter: visible ? "blur(0px)" : `blur(${blur}px)`,
        opacity: visible ? 1 : 0,
      }}
      className={cn("transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform", className)}
    >
      {children}
    </div>
  );
}
