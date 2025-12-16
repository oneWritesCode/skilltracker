import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutDevsCard from "../components/AboutDevsCard";

gsap.registerPlugin(ScrollTrigger);

function TeamSection({ id }) {
    const paragraphRef = useRef(null);

    const devs = [
        {
            name: "Aditya Mishra",
            image: "/About/Aditya_Mishra.png",
            cardClasses: "sm:translate-y-0 translate-y-20",
            bg: "bg-Purple",
            border: "border-Dark",
            cardRotation: "-rotate-3",
            textColor: "text-Dark",
            zIndex: "z-20",
            offsetClasses: "lg:-rotate-2",
        },
        {
            name: "Anmol Dhand",
            image: "/About/Anmol_Dhand.png",
            cardClasses: "sm:translate-x-0 translate-x-20",
            bg: "bg-Green",
            border: "border-Dark",
            cardRotation: "rotate-3",
            textColor: "text-Yellow",
            zIndex: "z-10",
            offsetClasses: "lg:rotate-2",
        },
    ];
    useEffect(() => {

        ScrollTrigger.create({
            trigger: `#${id}`,
            start: "top top",
            endTrigger: "#team-section",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: true,
        });

        // Animate the paragraph
        if (paragraphRef.current) {
            gsap.fromTo(
                paragraphRef.current,
                { y: "30vh", opacity: 0 },
                {
                    y: "0vh",
                    opacity: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: paragraphRef.current,
                        start: "top 150%",
                        end: "top 60%",
                        scrub: true,
                    },
                },
            );
        }
    }, [])

    return (
        <>
            {/* interval/break for upper section */}
            {/* <div className="w-full h-[80vh]"></div> */}
            <div id={id} className="bg-Yellow flex z-10 min-h-screen md:h-screen items-center px-4 sm:px-6 md:px-10 pb-12 md:pb-20">
                <div id={id} className=" bg-Yellow z-1 md:pt-[10vh] mx-auto w-full">
                    {/* Team Cards Container */}
                    <div className="md:h-auto h-[70vh] md:scale-100 scale-75 flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-start lg:justify-center sm:-translate-x-2 lg:-translate-x-3">

                        {devs.map((dev, index) => (
                            <AboutDevsCard key={dev.name} dev={dev} index={index} />
                        ))}
                    </div>

                    {/* Company Description */}
                    <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 w-full text-center">
                        <p
                            ref={paragraphRef}
                            className=" text-Dark mx-auto w-full max-w-7xl px-4 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold leading-tight sm:leading-none md:leading-[0.9] lg:leading-[0.8]"
                        >
                            MASHOORIYA FUSES MUSIC, CULTURE, AND STRATEGY TO AMPLIFY
                            INDEPENDENT VOICES. WE CRAFT CAMPAIGNS THAT FEEL LIKE CULTURE
                            ITSELF—DRIVEN BY STREET INSIGHT AND SHARP CREATIVITY SO ARTISTS,
                            BRANDS, AND STORIES DON'T JUST APPEAR, THEY RESONATE.
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default TeamSection