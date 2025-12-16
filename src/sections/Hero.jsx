import React from 'react'
import HeroMarquee from '../components/HeroMarquee';

const Hero = ({id}) => {
    return (
        <section
            id={id}
            className="relative w-full h-screen bg-Dark flex justify-center overflow-hidden"
        >
            {/* Green angled bottom strip (replaces #hero::after) */}
            <div className="pointer-events-none absolute inset-0 bg-Green [clip-path:polygon(0_90%,100%_85%,100%_100%,0_100%)]" />

            {/* Content above background shape */}
            <div className="relative z-10 flex w-full items-end">
                <HeroMarquee />
            </div>
        </section>
    )
}

export default Hero;