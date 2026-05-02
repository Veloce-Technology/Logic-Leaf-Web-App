"use client";
import { forwardRef } from "react";

const SplineRobot = forwardRef<HTMLDivElement>(function SplineRobot(_, ref) {
  return (
    <div
      ref={ref}
      className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow rings */}
      {/* <div className="absolute inset-[5%] rounded-full bg-[radial-gradient(circle,rgba(13,205,106,0.1)_0%,transparent_70%)] animate-pulse pointer-events-none z-0" /> */}

      <iframe
        src="https://my.spline.design/genkubgreetingrobot-sVPkRpWHJm358qeKAAJJzy8L/"
        frameBorder="0"
        width="100%"
        height="100%"
        title="3D Greeting Robot"
        className="relative z-10 w-full h-[110%] absolute top-0 left-0 bg-transparent transition-opacity duration-1000"
        style={{
          filter: "hue-rotate(-8deg) brightness(1.1) saturate(1.1)",
        }}
        loading="eager"
      />
    </div>
  );
});

export default SplineRobot;
