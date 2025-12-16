import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Single developer card with scroll-in animation.
 */
function AboutDevsCard({ dev, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const fromLeft = index % 2 === 0;

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          x: fromLeft ? "-50vh" : "50vh",
          // y: fromLeft ? "30vh" : "30vh",
          // scale: 0,
          rotation: fromLeft ? -12 : 12,
        },

        {
          x: fromLeft ? " " : "-5vh",
          // y: fromLeft ? "0vh" : "0vh",
          rotation: 0,
          // scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 150%",
            end: "top 70%",
            scrub: 0.1,
          },
        },
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`relative ${dev.zIndex} ${dev.offsetClasses} transform transition-transform duration-300 hover:rotate-0`}
    >
      <div
        className={`${dev.bg} ${dev.border} ${dev.cardRotation} ${dev.cardClasses} w-full overflow-hidden border-4 p-2 sm:p-4`}
      >
        <div className="  relative border-4 border-black overflow-hidden
        h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px]
        w-full">
          <img src={dev.image} alt={dev.name} className={`h-full w-full`} />
        </div>
        <div className={`${dev.bg} px-2 py-1`}>
          <h3 className={`${dev.textColor} text-center text-4xl sm:text-6xl font-bold md:text-8xl lg:text-8xl`}>
            {dev.name.toUpperCase()}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AboutDevsCard;