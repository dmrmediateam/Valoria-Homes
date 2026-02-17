"use client";

import { useEffect, useRef, useState } from "react";

type RevealDirection = "left" | "right" | "up";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  from?: RevealDirection;
  delayMs?: number;
  once?: boolean;
  threshold?: number;
};

const hiddenDirectionClasses: Record<RevealDirection, string> = {
  left: "-translate-x-10",
  right: "translate-x-10",
  up: "translate-y-8"
};

export default function RevealOnScroll({
  children,
  className = "",
  from = "up",
  delayMs = 0,
  once = true,
  threshold = 0.2
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, threshold]);

  const visibilityClasses = isVisible ? "translate-x-0 translate-y-0 opacity-100" : `${hiddenDirectionClasses[from]} opacity-0`;
  const combinedClassName = `transition-all duration-700 ease-out will-change-transform ${visibilityClasses} ${className}`.trim();

  return (
    <div ref={ref} className={combinedClassName} style={{ transitionDelay: `${delayMs}ms` }}>
      {children}
    </div>
  );
}
