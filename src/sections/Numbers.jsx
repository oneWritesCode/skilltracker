import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NumberTitles from "../components/NumberTitles";

gsap.registerPlugin(ScrollTrigger);

const Numbers = ({ id }) => {
  const titleRef = useRef(null);
  // const tile1Ref = useRef(null);
  // const tile2Ref = useRef(null);
  // const tile3Ref = useRef(null);
  // const tile4Ref = useRef(null);

  useEffect(() => {
    const el = titleRef.current;

    // Title animation
    gsap.fromTo(
      el,
      { y: "50vh", scale: 0.7 },
      {
        y: 0,
        scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 150%",
          end: "top 40%",
          scrub: 1,
        },
      },
    );

    // Pin section
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: "top top",
      // endTrigger: "#bar-section",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: true,
    });

    // Tile animations – rotate and scale in
    // [tile1Ref, tile2Ref, tile3Ref, tile4Ref].forEach((ref, i) => {
    //   gsap.fromTo(
    //     ref.current,
    //     { scale: 0, rotate: i === 0 ? -10 : i === 1 ? 8 : -6 },
    //     {
    //       scale: 1,
    //       rotate: i === 0 ? -6 : i === 1 ? 5 : -8,
    //       ease: "ease.out",
    //       scrollTrigger: {
    //         trigger: el,
    //         start: "top 150%",
    //         end: "top 40%",
    //         scrub: 1,
    //       },
    //     },
    //   );
    // });

    // return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [id]);

  return (
    <>
      <div
        id={id}
        className="bg-Yellow font-khand relative flex min-h-screen items-center justify-center p-4 sm:p-8"
      >
        <div className="relative flex h-screen w-full max-w-7xl flex-col items-center justify-center pb-10 text-center font-bold">
          {/* Title */}
          <h1
            ref={titleRef}
            className="text-Dark text-[5rem] leading-[0.8] font-extrabold tracking-tight uppercase sm:text-[9rem] md:text-[9rem] lg:text-[12rem]"
          >
            Numbers that <br />  Make Major    <br /> Noiseeee!
          </h1>

          {/* Tile 1 – Top Right */}
          <NumberTitles
            classes="bg-Purple text-Dark sm:top-[28%] sm:left-[2%] top-[15%] left-[2%] md:left-[20%] lg:top-[17%] lg:left-[8%] "
            number="6X"
            text={
              <>
                average <br /> engagement rate
              </>
            }
            initialRotate={-6}
            secondRotate={-8}
          />

          {/* Tile 2 – top Left */}
          <NumberTitles
            classes="bg-White text-Dark sm:top-[28%] sm:right-[4%] top-[23%] right-[1%] lg:top-[17%] lg:right-[9%] "
            number="28M+"
            text={
              <>
                views <br /> across campaigns
              </>
            }
            initialRotate={-10}
            secondRotate={6}
          />

          {/* Tile 3 – Bottom Left */}
          <NumberTitles
            classes="bg-Green text-White top-[65%] left-[10%] md:top-[25%] md:right-[15%] lg:top-[63%] lg:left-[25%]"
            number="50+"
            text={
              <>
                virals <br /> this year
              </>
            }
            initialRotate={8}
            secondRotate={5}
          />

          {/* Tile 4 – Bottom Center-Right */}

          <NumberTitles
            classes="bg-Dark text-Yellow top-[63%] right-[5%] md:right-[22%] lg:right-[20%] "
            number="40+"
            text={<>artists marketed</>}
            initialRotate={-6}
            secondRotate={-8}
          />

          {/* <div
          ref={tile1Ref}
          className="bg-White text-Dark absolute top-[44%] right-[4%] flex rotate-[-6deg] transform items-center gap-2 px-3 py-1 md:top-[20%] md:right-[12%] md:block"
        >rounded
          <p className="pt-1 text-4xl font-extrabold md:text-5xl">28M+</p>
          <p className="text-left text-lg leading-none uppercase md:text-center md:text-base">
            views <br /> across campaigns
          </p>
        </div> */}

          {/* <div
            ref={tile2Ref}
            className="bg-Green text-White absolute top-[55%] left-[20%] flex w-max rotate-[6deg] transform items-center gap-2 px-3 py-1 md:top-[18%] md:right-[15%] md:block"
          >
            <p className="pt-1 text-4xl font-extrabold md:text-5xl">50+</p>
            <p className="text-left text-lg leading-none uppercase md:text-center md:text-base">
              virals <br /> this year
            </p>
          </div> */}

          {/* <div
            ref={tile3Ref}
            className="bg-Purple text-Dark absolute top-[50%] left-[2%] z-[100] flex w-max rotate-[5deg] transform items-center gap-2 px-4 py-2 md:left-[15%] md:block"
          >
            <p className="pt-1 text-4xl font-extrabold md:text-5xl">6X</p>
            <p className="text-left text-lg leading-none uppercase md:text-center md:text-base">
              average <br /> engagement rate
            </p>
          </div> */}
          {/* <div
            ref={tile4Ref}
            className="bg-Dark text-Yellow absolute top-[57%] right-[2%] flex w-max rotate-[-8deg] transform items-center gap-2 px-4 py-2 md:right-[20%] md:block"
          >
            <p className="pt-1 text-4xl font-extrabold md:text-5xl">40+</p>
            <p className="pt-1 text-lg text-nowrap uppercase md:text-base">
              artists marketed
            </p>
          </div> */}
        </div>
      </div>
      <div className="font-khand relative flex min-h-[50vh] items-center justify-center bg-transparent p-4 sm:p-8"></div>
    </>
  );
};

export default Numbers;
