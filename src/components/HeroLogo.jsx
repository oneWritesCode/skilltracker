import { useEffect, useRef } from "react";
import { gsap } from "gsap";


const HeroLogo = ({color}) => {

    const animationIdRef = useRef(null);
    const pausedRef = useRef(false);
    const hoveredRectIdRef = useRef(null);
    const bassHitCounterRef = useRef(0);
    const frozenStatesRef = useRef({});
    const logoLockedRef = useRef(false);

    const rects = [
        { id: "rect1", baseHeight: 78.81, baseY: 434.59 },
        { id: "rect2", baseHeight: 194.89, baseY: 180.67 },
        { id: "rect3", baseHeight: 117.67, baseY: 140.16 },
        { id: "rect4", baseHeight: 244.44, baseY: 15.29 },
        { id: "rect5", baseHeight: 140.99, baseY: 230.32 },
        { id: "rect6", baseHeight: 125.15, baseY: 411.41 },
    ];

    // === Animation helpers ===
    const bassPattern = [
        { time: 0, intensity: 1.0 },
        { time: 0.3, intensity: 0.7 },
        { time: 0.6, intensity: 0.4 },
        { time: 0.8, intensity: 0.8 },
        { time: 1.0, intensity: 1.2 },
        { time: 1.2, intensity: 0.3 },
        { time: 1.5, intensity: 0.9 },
        { time: 1.8, intensity: 0.5 },
        { time: 2.0, intensity: 1.5 },
        { time: 2.1, intensity: 1.3 },
        { time: 2.3, intensity: 0.6 },
        { time: 2.6, intensity: 0.2 },
        { time: 3.0, intensity: 1.8 },
        { time: 3.2, intensity: 0.4 },
        { time: 3.5, intensity: 1.0 },
        { time: 3.8, intensity: 0.7 },
    ];

    


    function getBassIntensity(time) {
        const cycleTime = time % 2.0;
        let prevHit = bassPattern[bassPattern.length - 1];
        let nextHit = bassPattern[0];

        for (let i = 0; i < bassPattern.length; i++) {
            if (bassPattern[i].time <= cycleTime) {
                prevHit = bassPattern[i];
            } else {
                nextHit = bassPattern[i];
                break;
            }
        }
        const timeSinceHit = cycleTime - prevHit.time;
        const decayFactor = Math.max(0, Math.exp(-timeSinceHit * 8));
        return prevHit.intensity * decayFactor + 0.4;
    }

    function triggerBassFlash() {
        rects.forEach((r) => {
            const rect = document.getElementById(r.id);
            if (rect) {
                rect.classList.remove("bass-hit");
                
                void rect.offsetWidth; // restart animation
                rect.classList.add("bass-hit");
            }
        });
    }

    function setRectHeight(rect, rectData, newHeight) {
        let newY;
        if (rectData.baseY < 0) {
            if (rectData.id === "rect6") {
                const heightDiff = rectData.baseHeight - newHeight;
                newY = rectData.baseY + heightDiff;
            } else {
                newY = rectData.baseY;
            }
        } else {
            if (rectData.id === "rect1") {
                newY = rectData.baseY;
            } else {
                const heightDiff = rectData.baseHeight - newHeight;
                newY = rectData.baseY + heightDiff;
            }
        }
        rect.setAttribute("height", newHeight);
        rect.setAttribute("y", newY);

        if (!pausedRef.current) {
            frozenStatesRef.current[rectData.id] = { height: newHeight, y: newY };
        }
    }

    function animate() {
        if (logoLockedRef.current) {
            animationIdRef.current = requestAnimationFrame(animate);
            return; // stop animation completely
        }

        if (pausedRef.current) {
            rects.forEach((rectData) => {
                const rect = document.getElementById(rectData.id);
                if (!rect) return;

                if (hoveredRectIdRef.current === rectData.id) {
                    const newHeight = rectData.baseHeight * 1.1;
                    setRectHeight(rect, rectData, newHeight);
                } else {
                    rect.setAttribute("height", rectData.baseHeight);
                    rect.setAttribute("y", rectData.baseY);
                }
            });
            animationIdRef.current = requestAnimationFrame(animate);
            return;
        }

        const time = Date.now() * 0.001;
        const bassIntensity = getBassIntensity(time);

        if (bassIntensity > 1.0 && bassHitCounterRef.current % 10 === 0) {
            triggerBassFlash();
        }
        bassHitCounterRef.current++;
        const scaleMultiplier = 1 + bassIntensity * 0.4;

        rects.forEach((rectData) => {
            const rect = document.getElementById(rectData.id);
            if (rect) {
                const newHeight = rectData.baseHeight * scaleMultiplier;
                setRectHeight(rect, rectData, newHeight);
            }
        });

        animationIdRef.current = requestAnimationFrame(animate);
    }


    // === Hook to start/cleanup animation ===
    useEffect(() => {
        const svg = document.getElementById("animatedLogo");
        const texts = document.querySelectorAll(".main-text");

        // Start animation loop
        animate();

        // Hover handlers
        const handleSvgEnter = () => {
            if (logoLockedRef.current) return;
            pausedRef.current = true;
            texts.forEach((t) => t.classList.add("visible"));
        };

        const handleSvgLeave = () => {
            if (logoLockedRef.current) return;
            pausedRef.current = false;
            hoveredRectIdRef.current = null;
            texts.forEach((t) => t.classList.remove("visible"));
        };

        svg.addEventListener("mouseenter", handleSvgEnter);
        svg.addEventListener("mouseleave", handleSvgLeave);

        rects.forEach((r) => {
            const rectEl = document.getElementById(r.id);
            if (rectEl) {
                rectEl.addEventListener("mouseenter", () => {
                    if (pausedRef.current && !logoLockedRef.current) {
                        hoveredRectIdRef.current = r.id;
                    }
                });
                rectEl.addEventListener("mouseleave", () => {
                    if (pausedRef.current && !logoLockedRef.current) {
                        hoveredRectIdRef.current = null;
                    }
                });
            }
        });

        const handleAnimationEnd = (e) => {
            if (e.target.classList.contains("bass-hit")) {
                e.target.classList.remove("bass-hit");
            }
        };
        document.addEventListener("animationend", handleAnimationEnd);

        // === GSAP transition on scroll ===
        let mm = gsap.matchMedia();
        mm.add(
            {
                isMobile: "(max-width: 768px)",
                isDesktop: "(min-width: 769px)",
            },
            (context) => {
                let { isMobile, isDesktop } = context.conditions;

                gsap.to(svg, {
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "top top",
                        end: "200px top",
                        scrub: true,
                        onUpdate: (self) => {
                            logoLockedRef.current = self.progress >= 1;
                        },
                    },
                    top: "0px",
                    left: "0px",
                    margin: isMobile ? "4rem 3rem" : "3.5rem 4rem",
                    scale: isMobile ? 0.2 : 0.15,
                    ease: "power1.inOut",
                });
            }
        );

        return () => {
            cancelAnimationFrame(animationIdRef.current);
            svg.removeEventListener("mouseenter", handleSvgEnter);
            svg.removeEventListener("mouseleave", handleSvgLeave);
            document.removeEventListener("animationend", handleAnimationEnd);
            mm.revert();
        };
    }, []);


    
    useEffect(() => {
        const svg = document.getElementById("animatedLogo");

        if (svg) {
            gsap.to(svg.querySelectorAll("polygon, rect"), {
                fill: (color == "Dark") ? "#1A2027": color,
                duration: 0.01, // smooth transition
                overwrite: true
            });
        }
    }, [color]);


    

    return (
        <div id="logo" className="">
            <svg
                id="animatedLogo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-100 -140 948.58 745.29"
                className="fixed top-1/2 left-1/2 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] -translate-x-1/2 -translate-y-1/2 z-1000"
            >
                {/* <g id="base">
                    <polygon 
                        points="575.6 402.7 583.35 402.7 583.35 545.28 467.34 545.28 491.06 287.84 356.61 432.99 223.51 293.53 250.77 545.28 125.16 545.28 125.16 402.7 131.99 402.7 129.25 400.52 218.15 288.99 222.81 292.7 217.53 275.02 354.16 234.21 356.26 241.23 360.68 229.32 494.36 278.97 491.09 287.78 507.12 276.41 589.68 392.68 575.6 402.7" />
                </g> */}

                <g id="background">
                    <polygon
                        points="0 545.29 250.77 545.28 223.51 293.53 356.61 432.99 491.06 287.84 467.34 545.28 662.15 545.29 662.15 402.69 575.6 402.7 748.58 279.83 666.01 163.56 491.09 287.78 535.32 168.66 401.64 119.01 356.26 241.23 284.26 0 147.61 40.78 222.81 292.7 107.9 201.12 19.01 312.63 131.99 402.7 0 402.68 0 545.29" />
                </g>


                <g id="r1">
                    <rect  id="rect1" x="551.45" y="434.59" width="142.61" height="78.81"
                        transform="translate(148.76 1096.74) rotate(-90)" />
                </g>

                <g id="r2">
                    <rect id="rect2" x="556.54" y="180.67" width="142.61" height="194.89"
                        transform="translate(491.06 -394.81) rotate(54.62)" />
                </g>

                <g id="r3">
                    <rect id="rect3" x="376.69" y="140.16" width="142.61" height="117.67"
                        transform="translate(97.29 -143.51) rotate(20.37)" />
                </g>

                <g id="l3">
                    <rect id="rect4" x="179.59" y="15.29" width="142.61" height="244.44"
                        transform="translate(-28.85 77.5) rotate(-16.62)" />
                </g>

                <g id="l2">
                    <rect id="rect5" x="47.28" y="230.32" width="142.61" height="140.99"
                        transform="translate(-190.56 206.03) rotate(-51.44)" />
                </g>

                <g id="l1">
                    <rect id="rect6" x="-8.73" y="411.41" width="142.61" height="125.15"
                        transform="translate(-411.41 536.56) rotate(-90)" />
                </g>

                <g id="p1">
                    <polygon
                        points="0 545.29 250.77 545.28 223.51 293.53 356.61 432.99 491.06 287.84 467.34 545.28 662.15 545.29 662.15 402.69 575.6 402.7 748.58 279.83 666.01 163.56 491.09 287.78 535.32 168.66 401.64 119.01 356.26 241.23 284.26 0 147.61 40.78 222.81 292.7 107.9 201.12 19.01 312.63 131.99 402.7 0 402.68 0 545.29" />
                </g>

                {/* <g id="labels" aria-hidden="true">

                    <text className="main-text" x="505" y="500"  fontSize="68">NEWS</text>

                    <text className="main-text" transform="rotate(324 295 130)" x="390" y="470" 
                        fontSize="75">REACH</text>

                    <text className="main-text" transform="rotate(290 220 90)" x="125" y="365" 
                        fontSize="75">HITS</text>

                    <text className="main-text" transform="rotate(74 155 115)" x="105" y="53" 
                        fontSize="75">SERVICE</text>

                    <text className="main-text" transform="rotate(38 90 165)" x="145" y="280" 
                        fontSize="75">STATS</text>

                    <text className="main-text" x="21" y="500"  fontSize="75">ABOUT</text>
                </g> */}

            </svg>
        </div>
    )
}

export default HeroLogo;