import React, { useState, useEffect } from 'react'

const Clients = ({ id }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div id={id} className='flex h-screen md:h-max py-4 bg-Yellow overflow-hidden'>
            <div className="w-full text-Green font-sans flex flex-col items-center justify-center py-12 px-0">
                <h1 className="text-[5rem] md:text-[9.5rem] lg:text-[11.5rem]  font-khand font-extrabold uppercase mb-4 text-center">
                    Clients
                </h1>

                <div className='relative flex flex-col gap-3 pt-4'>
                    {!isMobile ? (
                        <>
                            <div className="w-full overflow-x-hidden overflow-y-hidden h-full py-2">
                                <div className="flex flex-nowrap justify-start gap-4 scroll-smooth -ml-[0vw]">
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                </div>
                            </div>

                            <div className="w-full overflow-x-hidden overflow-y-hidden h-full py-2">
                                <div className="flex flex-nowrap justify-start gap-4 scroll-smooth -ml-[3vw]">
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                </div>
                            </div>

                            <div className="w-full overflow-x-hidden overflow-y-hidden h-full py-2">
                                <div className="flex flex-nowrap justify-start gap-4 scroll-smooth ml-[2vw]">
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 rotate-[3.49deg]  font-bold rounded-4xl"></div>
                                    <div className="bg-Dark w-64 flex items-center justify-center h-44 -rotate-[2.51deg]  font-bold rounded-4xl"></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full overflow-x-hidden overflow-y-hidden h-full py-1">
                                <div className="flex flex-nowrap justify-start gap-2 scroll-smooth -ml-[2vw]">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className={`bg-Dark w-24 flex items-center justify-center h-20 ${i % 2 === 0 ? 'rotate-[4deg]' : '-rotate-[3deg]'}  font-bold rounded-2xl`}></div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full overflow-x-hidden overflow-y-hidden h-full py-1">
                                <div className="flex flex-nowrap justify-start gap-2 scroll-smooth ml-[1vw]">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className={`bg-Dark w-24 flex items-center justify-center h-20 ${i % 2 === 0 ? '-rotate-[3deg]' : 'rotate-[4deg]'}  font-bold rounded-2xl`}></div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full overflow-x-hidden overflow-y-hidden h-full py-1">
                                <div className="flex flex-nowrap justify-start gap-2 scroll-smooth -ml-[4vw]">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className={`bg-Dark w-24 flex items-center justify-center h-20 ${i % 2 === 0 ? 'rotate-[3deg]' : '-rotate-[4deg]'}  font-bold rounded-2xl`}></div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full overflow-x-hidden overflow-y-hidden h-full py-1">
                                <div className="flex flex-nowrap justify-start gap-2 scroll-smooth ml-[2vw]">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className={`bg-Dark w-24 flex items-center justify-center h-20 ${i % 2 === 0 ? '-rotate-[4deg]' : 'rotate-[3deg]'}  font-bold rounded-2xl`}></div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full overflow-x-hidden overflow-y-hidden h-full py-1">
                                <div className="flex flex-nowrap justify-start gap-2 scroll-smooth -ml-[1vw]">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className={`bg-Dark w-24 flex items-center justify-center h-20 ${i % 2 === 0 ? 'rotate-[4deg]' : '-rotate-[3deg]'}  font-bold rounded-2xl`}></div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Clients