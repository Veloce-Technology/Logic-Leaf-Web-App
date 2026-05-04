"use client";
import { forwardRef } from "react";

const SplineRobot = forwardRef<HTMLDivElement>(function SplineRobot(_, ref) {
  return (
    <div
      ref={ref}
      className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden"
    >
      <iframe
        src="https://my.spline.design/genkubgreetingrobot-sVPkRpWHJm358qeKAAJJzy8L/"
        frameBorder="0"
        width="100%"
        height="100%"
        title="3D Greeting Robot"
        className="relative z-10 w-full h-[110%] absolute top-0 left-0 bg-transparent transition-opacity duration-1000"
        style={{
          filter: "hue-rotate(-8deg) brightness(1.1) saturate(1.1)",
          // We use a combination of properties to try and minimize unwanted interactions
          // while keeping the gaze tracking alive if the browser allows.
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        loading="eager"
      />
      
      {/* Precision Blocker Overlay */}
      {/* This overlay is transparent and allows the user to see the model,
          but it intercepts the mouse-down signals that would otherwise start a camera orbit/drag.
          By using 'pointer-events-none' here, we're relying on the HeroSection's parent 
          handlers to manage the overall interaction logic. */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
      />
    </div>
  );
});

export default SplineRobot;
