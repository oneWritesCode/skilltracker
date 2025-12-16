import React from "react";

const ViralSongsCard = ({
  songName,
  artistName,
  image,
  rotation,
  bgColor = "var(--Green)",
}) => {
  return (
    <div
      className={`font-khand text-Dark border-Dark relative overflow-hidden px-4 py-8 text-center font-bold tracking-tight backdrop-blur-sm `}
      style={{ backgroundColor: bgColor,
        transform: `rotate(${rotation || 0}deg)`,

      }}
    >
      <div className="relative w-full top-0 right-0 left-0 h-full">
        <img src={image} alt="" className="w-[40vw] sm:w[30vw] md:w-[30vw] lg:w-[20vw] " loading="lazy" />
      </div>

      <div className="absolute top-0 flex w-full h-full items-end justify-start  ">
        <div
          className={`w-full py-4 ${
            bgColor === "var(--Green)"
              ? "from-Green via-Green/70 to-Green/20 bg-gradient-to-t"
              : "from-Yellow via-Yellow/70 to-Yellow/20 bg-gradient-to-t"
          }`}
        >
          <div
            className="mb-2 h-full text-left leading-[0.7] uppercase"
            style={{
              color:
                bgColor === "var(--Green)" ? "var(--Yellow)" : "var(--Green)",
            }}
          >
            <span className="text-[2rem] font-black tracking-[-0.02em] sm:text-[2rem] md:text-[3rem] lg:text-[4rem]">
              {songName}
            </span>
          </div>
          <div
            className="mb-2 text-left leading-[1] uppercase"
            style={{
              color:
                bgColor === "var(--Green)" ? "var(--Yellow)" : "var(--Green)",
            }}
          >
            <span className="text-[0.5rem] font-extrabold sm:text-[1rem] md:text-[2rem] lg:text-[2rem]">
              BY {artistName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViralSongsCard;
