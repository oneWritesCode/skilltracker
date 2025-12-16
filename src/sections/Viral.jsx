import React, { useEffect, useRef } from "react";
import ViralSongsCard from "../components/ViralSongsCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Viral = ({ id }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const cardData = [
    {
      songName: "kahi teri bol",
      artistName: "swagar boy",
      image: "/SongImage/kahi-teri-bol.png",
      bgColor: "var(--Yellow)",
      rotation: 4,
    },
    {
      songName: "kahi teri bol",
      artistName: "swagar boy",
      image: "/SongImage/kahi-teri-bol.png",
      bgColor: "var(--Green)",
      rotation: -4,
    },
    {
      songName: "kahi teri bol",
      artistName: "swagar boy",
      image: "/SongImage/kahi-teri-bol.png",
      bgColor: "var(--Yellow)",
      rotation: 6,
    },
    {
      songName: "kahi teri bol",
      artistName: "swagar boy",
      image: "/SongImage/kahi-teri-bol.png",
      bgColor: "var(--Green)",
      rotation: -6,
    },
  ];

  useEffect(() => {
    if (
      !sectionRef.current ||
      !titleRef.current ||
      cardsRef.current.length === 0
    )
      return;

    // a timeline that pins the section and animates cards one by one
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * cardsRef.current.length * 0.8}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    gsap.fromTo(
      titleRef.current,
      { y: "50vh"},
      {
        y: "0 vh",
        scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 160%",
          end: "top 10%",
          scrub: true,
        },
      },
    );

    // Animate each card one after another, stacking on top
    cardsRef.current.forEach((el, index) => {
      if (el) {
        gsap.set(el, { zIndex: index + 1 });

        tl.fromTo(
          el,
          { y: "80vh", scale: 0.7 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "ease.out",
            duration: 1,
          },
        );
      }
    });

    // Keep title hidden until all cards are done
    // Title stays out of the way during the entire animation

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      className="bg-Purple sticky top-0 right-0 flex h-full min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute top-0 right-0 z-[100] flex w-full flex-col items-center justify-center">
        <div
          ref={titleRef}
          className="text-Dark relative top-0 left-0 z-10 flex h-screen w-[100vw] max-w-7xl flex-col justify-start sm:justify-center px-4 py-[28vh] text-center leading-[0.75] font-bold sm:px-6 md:px-8 text-[4rem] sm:text-[9rem] md:text-[9.5rem] lg:px-4 lg:text-[12rem]"
        >
          <p className="whitespace-nowrap md:whitespace-normal">THE CURRENT</p>
          <p className="whitespace-nowrap md:whitespace-normal">VIRALS AND</p>
          <p className="whitespace-nowrap md:whitespace-normal">ARTISTS POPPIN</p>
        </div>
      </div>

      <div className="z-[1000] w-full">
        <div className="absolute inset-0 top-0 left-0 flex h-screen w-full items-center justify-center">
          <div
            className="absolute top-0 right-0 flex items-end sm:p-4 p-[20vh] sm:items-center justify-center"
            style={{ width: "100%", height: "100%" }}
          >
            {cardData.map((card, index) => (
              <div
                key={index}
                ref={addToRefs}
                className="absolute"
                style={{ zIndex: index + 1 }}
              >
                <ViralSongsCard
                  image={card.image}
                  songName={card.songName}
                  artistName={card.artistName}
                  bgColor={card.bgColor}
                  rotation={card.rotation}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 z-[1000] m-4">
        <div className="text-Purple bg-Dark px-4 text-[2rem] leading-[1.2] font-black tracking-[-0.01em] sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
          More...
        </div>
      </div>
    </div>
  );
};

export default Viral;
