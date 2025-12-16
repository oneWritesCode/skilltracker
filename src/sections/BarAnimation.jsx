import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BarAnimation = ({ id }) => {
  const containerRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    const bars = barsRef.current;
    const barHeights = [95, 85, 95, 95, 90, 90]; // different heights for variety
    const order = [2, 0, 4, 1, 5, 3];
    const orderedBars = order.map((i) => bars[i]);

    // Create an overall timeline tied to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate bars one by one inside the timeline
    orderedBars.forEach((bar, i) => {
      tl.fromTo(
        bar,
        { height: "0%" },
        {
          height: `${barHeights[order[i]]}%`,
          ease: "power3.out",
          duration: 1,
        },
        i * 0.2 // ← sequential offset between bars
      );
    });
  }, []);


  const barCount = 6;
  const barWidth = 100 / barCount;

  return (
    <div
      id={id}
      ref={containerRef}
      className="bg-transparent relative w-full h-[80%]"
    >
      <div className="absolute bottom-0 z-[-1] bg-Yellow w-full h-[100%]"></div>
      {[...Array(barCount)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          className="absolute bottom-0 bg-Purple border-Green border-b-0"
          style={{
            left: `${i * barWidth}%`,
            width: `${barWidth}%`,
            height: "0%",
          }}
        ></div>
      ))}
    </div>
  );
};

export default BarAnimation;
