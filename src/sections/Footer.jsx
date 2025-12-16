import React from "react";

const Footer = ({ id }) => {
  return (
    <div
      id={id}
      className="w-full bg-Dark flex flex-col justify-end pt-12 md:pt-20"
    >
      {/* Top Section */}
      <div className="flex w-full items-center justify-center uppercase">
        <div className="text-Yellow font-bold flex flex-col md:flex-row gap-16 min-w-[90%] justify-between">
          
          {/* Left */}
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl leading-none">contact</h2>
            <p className="text-3xl md:text-5xl leading-none underline break-all">
              WE@MASHOORIYA.COM
            </p>

            <div className="pt-8">
              <h2 className="text-xl md:text-2xl leading-none">
                QUICK LINKS
              </h2>
              <p className="text-2xl md:text-3xl underline">
                masooriya originals
              </p>
              <p className="text-2xl md:text-3xl underline">service</p>
              <p className="text-2xl md:text-3xl underline">hit list</p>
            </div>
          </div>

          {/* Right */}
          <div className="text-center md:text-right">
            <h2 className="text-xl md:text-2xl leading-none">contact</h2>
            <p className="text-3xl md:text-5xl leading-none underline break-all">
              WE@MASHOORIYA.COM
            </p>
          </div>
        </div>
      </div>

      {/* Credit */}
      <div className="text-Yellow w-full flex items-center justify-center py-8">
        <img
          src="./team zeroone made this!.png"
          className="max-w-[200px] md:max-w-none"
          alt=""
        />
      </div>

      {/* Bottom Image */}
      <div>
        <img src="./mash0oriya.png" className="w-full object-contain" alt="" />
      </div>
    </div>
  );
};

export default Footer;
