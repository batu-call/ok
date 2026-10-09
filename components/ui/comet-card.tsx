"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { cn } from "@/lib/utils";

export const CometCard = ({
  rotateDepth = 18,
  translateDepth = 10,
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = {
    stiffness: 260,
    damping: 20,
    mass: 0.4,
  };

  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const hoverProgress = useMotionValue(0);
  const hoverSpring = useSpring(hoverProgress, springConfig);

  /*
   * =========================================================
   * 3D ROTATION
   * =========================================================
   */

  const rotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`]
  );

  const rotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );

  /*
   * =========================================================
   * CONTENT PARALLAX
   * =========================================================
   *
   * Aceternity tarzındaki hissin önemli kısmı burası.
   * İçerik karttan biraz öne çıkar.
   *
   * Fakat 100px gibi aşırı yüksek bir Z kullanmıyoruz.
   * 35px daha kontrollü.
   */

  const contentZ = useTransform(
    hoverSpring,
    [0, 1],
    [0, 35]
  );

  const innerX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );

  const innerY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );

  /*
   * =========================================================
   * DISTANCE
   * =========================================================
   */

  const distance = useTransform(
    [mouseX, mouseY],
    ([mx, my]: number[]) =>
      Math.sqrt(mx * mx + my * my)
  );

  /*
   * =========================================================
   * VERY SMALL SCALE
   * =========================================================
   *
   * Scale tamamen sıfırlanmıyor ama %1 civarında tutuluyor.
   * Böylece kartın 3D hissi korunurken raster görüntü
   * gereksiz büyütülmüyor.
   */

  const scale = useTransform(
    [distance, hoverSpring],
    ([d, h]: number[]) => {
      const maxScale = 1.012 - Math.min(d, 0.7) * 0.008;

      return 1 + (maxScale - 1) * h;
    }
  );

  /*
   * =========================================================
   * DYNAMIC SHADOW
   * =========================================================
   */

  const shadowX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-38, 38]
  );

  const shadowY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [-25, 45]
  );

  const shadowBlur = useTransform(
    distance,
    [0, 0.7],
    [55, 42]
  );

  const boxShadow = useMotionTemplate`
    ${shadowX}px
    ${shadowY}px
    ${shadowBlur}px
    -12px
    rgba(0,0,0,0.48),
    0px 24px 45px -16px rgba(0,0,0,0.36)
  `;

  /*
   * =========================================================
   * MAIN GLARE
   * =========================================================
   */

  const glareX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [0, 100]
  );

  const glareY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [0, 100]
  );

  const glareBackground = useMotionTemplate`
    radial-gradient(
      circle 190px at ${glareX}% ${glareY}%,
      rgba(255,255,255,0.48) 0%,
      rgba(255,255,255,0.18) 24%,
      rgba(255,255,255,0.06) 45%,
      transparent 72%
    )
  `;

  /*
   * =========================================================
   * EDGE LIGHT
   * =========================================================
   */

  const edgeGradient = useMotionTemplate`
    linear-gradient(
      ${glareX}deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.10) 25%,
      rgba(255,255,255,0.34) 50%,
      rgba(255,255,255,0.08) 75%,
      rgba(255,255,255,0) 100%
    )
  `;

  /*
   * =========================================================
   * SPECULAR
   * =========================================================
   */

  const highlightX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-20, 120]
  );

  const highlightY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [-20, 120]
  );

  const highlightBackground = useMotionTemplate`
    radial-gradient(
      ellipse 130px 50px at
      ${highlightX}% ${highlightY}%,
      rgba(255,255,255,0.24),
      rgba(255,255,255,0.06) 42%,
      transparent 72%
    )
  `;

  /*
   * =========================================================
   * COLOR DEPTH
   * =========================================================
   */

  const colorX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [0, 100]
  );

  const colorY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [100, 0]
  );

  const colorGradient = useMotionTemplate`
    radial-gradient(
      circle at ${colorX}% ${colorY}%,
      rgba(120,180,255,0.08),
      rgba(180,120,255,0.04) 35%,
      transparent 70%
    )
  `;

  /*
   * =========================================================
   * RIM LIGHT
   * =========================================================
   */

  const rimOpacity = useTransform(
    hoverSpring,
    [0, 1],
    [0.08, 0.5]
  );

  /*
   * =========================================================
   * CARD
   * =========================================================
   */

  return (
    <div
      className={cn(
        "perspective-distant transform-3d",
        className
      )}
      style={{
        perspective: 1200,
        contain: "paint",
      }}
    >
      <motion.div
        ref={ref}
        onMouseEnter={handleMouseEnterWrapper}
        onMouseMove={handleMouseMoveWrapper}
        onMouseLeave={handleMouseLeaveWrapper}
        style={{
          rotateX,
          rotateY,
          scale,
          boxShadow,

          transformStyle: "preserve-3d",

          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="
          relative
          rounded-2xl
          will-change-transform
        "
      >
        {/* =================================================
            BACK / THICKNESS
            ================================================= */}

        <motion.div
          aria-hidden
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-2xl
            bg-black/60
            border
            border-white/10
          "
          style={{
            transform: "translateZ(-10px)",
            opacity: hoverSpring,
          }}
        />

        {/* =================================================
            MAIN CONTENT
            ================================================= */}

        <motion.div
          style={{
            x: innerX,
            y: innerY,
            translateZ: contentZ,

            transformStyle: "preserve-3d",

            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="
            relative
            rounded-2xl
          "
        >
          {children}
        </motion.div>

        {/* =================================================
            GLARE
            ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            inset-0
            z-40
            rounded-2xl
            overflow-hidden
          "
          style={{
            background: glareBackground,
            opacity: hoverSpring,
          }}
        />

        {/* =================================================
            SPECULAR
            ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[41]
            rounded-2xl
            overflow-hidden
          "
          style={{
            background: highlightBackground,
            opacity: hoverSpring,
          }}
        />

        {/* =================================================
            EDGE LIGHT
            ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[42]
            rounded-2xl
          "
          style={{
            background: edgeGradient,
            opacity: hoverSpring,
          }}
        />

        {/* =================================================
            COLOR DEPTH
            ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[43]
            rounded-2xl
            mix-blend-screen
          "
          style={{
            background: colorGradient,
            opacity: hoverSpring,
          }}
        />

        {/* =================================================
            RIM BORDER
            ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            inset-0
            z-50
            rounded-2xl
            border
            border-white
          "
          style={{
            opacity: rimOpacity,
          }}
        />

        {/* =================================================
            INNER BORDER
            ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-[1px]
            z-50
            rounded-[15px]
            border
            border-white/[0.04]
          "
        />
      </motion.div>
    </div>
  );

  /*
   * =========================================================
   * MOUSE EVENTS
   * =========================================================
   */

  function handleMouseMoveWrapper(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const xPct =
      (e.clientX - rect.left) / rect.width - 0.5;

    const yPct =
      (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseEnterWrapper() {
    hoverProgress.set(1);
  }

  function handleMouseLeaveWrapper() {
    x.set(0);
    y.set(0);
    hoverProgress.set(0);
  }
};