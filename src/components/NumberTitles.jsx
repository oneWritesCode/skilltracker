import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function NumberTitles(props) {
  const tile1Ref = useRef(null);

  useEffect(() => {
    const el = tile1Ref.current;

    gsap.fromTo(
      tile1Ref.current,
      { scale: 0, rotate: props.initialRotate },
      {
        scale: 1,
        rotate: props.secondRotate,
        ease: "ease.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={tile1Ref}
      className={`w-max absolute flex transform items-center gap-2 px-3 py-1 md:block ${props.classes}`}
    >
      <p className="pt-1 text-4xl font-extrabold md:text-6xl">{props.number}</p>
      <p className="text-left text-lg leading-none uppercase md:text-center md:text-[1.5rem]">
        {props.text}
      </p>
    </div>
  );
}

export default NumberTitles;
