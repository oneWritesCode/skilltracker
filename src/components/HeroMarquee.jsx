import React from 'react'
import Marquee from "react-fast-marquee";

const HeroMarquee = () => {
    return (
        <>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] flex flex-col justify-end w-full">
                {/* <div className="absolute -top-32 right-0 pr-6 text-Yellow font-khand font-medium text-2xl md:text-3xl tracking-tight">
                    <p className="uppercase">CURRENT HITS</p>
                </div> */}
                <Marquee
                    autoFill={true}
                    speed={60}
                    gradient={false}
                    pauseOnHover={false}
                >
                    <div className='overflow-hidden flex items-start space-x-4 px-6 py-0 md:py-4 sm:py-1'>
                        <span className="flex-none mt-3 text-[2.8rem] md:text-[3.8rem] lg:text-[4rem] font-khand font-extrabold text-Yellow whitespace-nowrap leading-none">
                            SHARMEELI
                        </span>
                        <img className="h-12 md:h-16 w-auto" src="/logo.webp" alt="" />
                        <span className="flex-none mt-3 text-[2.8rem] md:text-[3.8rem] lg:text-[4rem] font-khand font-extrabold text-Yellow whitespace-nowrap leading-none">
                            RING A ROSE
                        </span>
                        <img className="h-12 md:h-16 w-auto" src="/logo.webp" alt="" />
                        <span className="flex-none mt-3 text-[2.8rem] md:text-[3.8rem] lg:text-[4rem] font-khand font-extrabold text-Yellow whitespace-nowrap leading-none">
                            KAHI TERI BOL
                        </span>
                        <img className="h-12 md:h-16 w-auto" src="/logo.webp" alt="" />
                    </div>
                </Marquee>
            </div>
        </>
    )
}

export default HeroMarquee;