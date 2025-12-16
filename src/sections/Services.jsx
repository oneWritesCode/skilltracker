import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Services = ({ id }) => {
    const titleRef = useRef(null)
    const servicesRef = useRef([])

    useEffect(() => {
        // Animate the title on scroll
        gsap.fromTo(
            titleRef.current,
            { y: "50vh" },
            {
                y: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 150%",
                    end: "top 60%",
                    scrub: true,
                },
            }
        )

        // Animate each service card individually
        servicesRef.current.forEach((el, index) => {
            gsap.fromTo(
                el,
                { y: "50vh", scale: 0.7 },
                {
                    y: 0,
                    scale: 1,
                    ease: "ease.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 160%",
                        end: "top 110%",
                        scrub: 1,
                    },
                }
            )
        })
    }, [])

    const addToRefs = (el) => {
        if (el && !servicesRef.current.includes(el)) {
            servicesRef.current.push(el)
        }
    }

    return (
        <>
            {/* interval/break for upper section */}
            <div className="w-full h-screen"></div>
            <div id={id} className="section h-screen w-full bg-Green flex items-center justify-center">
                <div className="relative font-['Khand'] uppercase flex flex-col justify-center items-center text-center">
                    <h1
                        ref={titleRef}
                        className="text-Yellow font-bold leading-none text-[5rem] md:text-[9.5rem] lg:text-[11.5rem] mb-[-0.90rem]"
                    >
                        Services
                    </h1>

                    <div
                        ref={addToRefs}
                        className="bg-Dark rounded-sm text-Purple w-max px-4 sm:py-2 py-6 pt-4 sm:mt-2 mt-10 md:mt-0 font-extrabold text-4xl md:text-5xl lg:text-7xl xl:text-8xl transform -rotate-2 leading-none my-[-0.5rem]"
                    >
                        Artist & Repertoire
                    </div>

                    <div
                        ref={addToRefs}
                        className="bg-Yellow rounded-sm text-Dark w-max px-4 sm:py-2 py-6 pt-4 font-extrabold text-4xl md:text-5xl lg:text-7xl xl:text-8xl transform rotate-1 leading-none my-[-0.5rem]"
                    >
                        Music Marketing
                    </div>

                    <div
                        ref={addToRefs}
                        className="bg-Dark rounded-sm text-Purple w-max px-4 sm:py-2 py-6 pt-4 font-extrabold text-4xl md:text-5xl lg:text-7xl xl:text-8xl transform -rotate-2 leading-none my-[-0.5rem]"
                    >
                        Artist Development
                    </div>

                    <div
                        ref={addToRefs}
                        className="bg-Yellow rounded-sm text-Dark w-max px-2 sm:py-2 py-4 pt-4 font-extrabold text-4xl md:text-5xl lg:text-7xl xl:text-8xl transform -rotate-4 leading-none my-[-0.5rem]"
                    >
                        Content & Rollout Design
                    </div>
                </div>
            </div>
            </>
    )
}

export default Services
