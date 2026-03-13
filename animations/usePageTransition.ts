"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const usePageTransition = (dependencies: unknown[] = []) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, dependencies);

  return containerRef;
};

export const useSlideIn = (
  direction: "left" | "right" | "up" | "down" = "up"
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const xFrom = direction === "left" ? -50 : direction === "right" ? 50 : 0;
      const yFrom = direction === "up" ? 50 : direction === "down" ? -50 : 0;

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: xFrom, y: yFrom },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [direction]);

  return containerRef;
};

export const useScaleIn = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

