import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Originals = ({ id }) => {
    const [displayText, setDisplayText] = useState('')
    const [hasAnimated, setHasAnimated] = useState(false)
    const subtitleRef = useRef(null)
    const buttonRef = useRef(null)
    const sectionRef = useRef(null)
    const fullText = 'EXPLORE\nMASHOORIYA\nORIGINALS'

    useEffect(() => {

        // ScrollTrigger.create({
        //     trigger: `#${id}`,
        //     start: "top top",
        //     // endTrigger: "#footer-section",
        //     end: "bottom top",
        //     pin: true,
        //     pinSpacing: false,
        //     scrub: true,
        // });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true)
                        startTypingAnimation()
                    }
                })
            },
            { threshold: 0.5 } // Trigger when 50% of section is visible
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [hasAnimated])

    const startTypingAnimation = () => {
        let index = 0
        const typingInterval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayText(fullText.slice(0, index))
                index++
            } else {
                clearInterval(typingInterval)
                // After typing completes, animate subtitle and button
                animateSubtitleAndButton()
            }
        }, 90) // Typing speed
    }

    const animateSubtitleAndButton = () => {
        // Animate subtitle from bottom
        gsap.fromTo(
            subtitleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )

        // Animate button after subtitle
        gsap.fromTo(
            buttonRef.current,
            { scale: 0, rotation: -8, opacity: 0 },
            {
                scale: 1,
                // rotation: -8, 
                opacity: 1,
                duration: 0.8,
                ease: 'step(24)',
                delay: 0.4
            }
        )
    }

    // Split text into lines
    const lines = displayText.split('\n')

    return (
        <>
            <div
                id={id}
                ref={sectionRef}
                className="relative bg-Dark min-h-screen w-full overflow-hidden"
            >
                <div className="pointer-events-none absolute -inset-1 bg-Yellow [clip-path:polygon(0_90%,100%_85%,100%_100%,0_100%)]" />

                <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-16">

                    {/* Main Title with Typing Animation */}
                    <div className="text-center">
                        {lines.map((line, index) => (
                            <h1
                                key={index}
                                className="
              text-Yellow font-extrabold tracking-tight
              text-[3.5rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9.5rem] xl:text-[11.5rem]
              leading-[0.9] sm:leading-[0.85] md:leading-[0.75]
            "
                            >
                                {line}
                                {index === lines.length - 1 &&
                                    displayText.length < fullText.length && (
                                        <span className="animate-pulse">|</span>
                                    )}
                            </h1>
                        ))}
                    </div>

                    {/* Subtitle */}
                    <h3
                        ref={subtitleRef}
                        className="
          text-Green font-bold text-center tracking-tight opacity-0
          text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl
          leading-tight sm:leading-[0.9]
          px-4 mt-4
        "
                    >
                        OUR OWN GROWN MUSIC LABEL
                    </h3>

                    {/* CTA Button */}
                    <div className="mt-4 sm:mt-4 md:-mt-2 flex justify-center">
                        <button
                            ref={buttonRef}
                            className="
            bg-Yellow text-Dark border-2 border-Dark rounded-lg
            font-extrabold rotate-[-8deg]
            px-4 sm:px-6
            text-xl sm:text-4xl md:text-5xl xl:text-7xl
            h-[2.5rem] sm:h-[3.5rem] md:h-[4.5rem]
            flex items-center justify-center
            hover:bg-opacity-90 transition-all duration-300
            transform hover:scale-105 opacity-0
          "
                        >
                            <span className="block leading-none">DIVE IN</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className='w-full h-[80vh]'></div> */}
            {/* <div className="pointer-events-none absolute inset-0 top-0 bg-Purple [clip-path:polygon(0_90%,100%_85%,100%_100%,0_100%)]" /> */}
        </>

    )
}

export default Originals;