"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * SVG displacement filter that powers the liquid-glass refraction.
 * Render once anywhere in the tree; the glass layers reference it by id.
 */
export const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }} aria-hidden="true">
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="160"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  onClick,
}) => {
  const glassStyle: React.CSSProperties = {
    boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex cursor-pointer overflow-hidden font-semibold transition-all duration-700",
        className,
      )}
      style={glassStyle}
    >
      {/* Refraction layer */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{
          backdropFilter: "blur(3px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      {/* Tint layer */}
      <div
        className="absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: "rgba(255, 255, 255, 0.18)" }}
      />
      {/* Inner highlight layer */}
      <div
        className="absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
        }}
      />
      <div className="relative z-30">{children}</div>
    </div>
  );
};

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  onClick,
  className,
}) => (
  <GlassEffect
    onClick={onClick}
    className={cn(
      "rounded-3xl px-8 py-5 hover:rounded-[2rem] hover:px-9 hover:py-6",
      className,
    )}
  >
    <div
      className="transition-all duration-700 hover:scale-95"
      style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)" }}
    >
      {children}
    </div>
  </GlassEffect>
);
