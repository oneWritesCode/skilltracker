export default function Form() {
  return (
    <div className="relative bg-Yellow min-h-screen flex justify-center items-start p-4 sm:p-6 md:p-10">
      
      {/* Background shape */}
      <div className="pointer-events-none absolute -inset-1 bg-Dark 
        [clip-path:polygon(0_90%,100%_85%,100%_100%,0_100%)]" />

      <div className="w-full max-w-full sm:max-w-[90%] md:max-w-[65%]">
        <form className="w-full flex flex-col gap-10 md:gap-16">

          <div className="flex flex-col gap-12 md:gap-20">

            {/* NAME */}
            <div className="relative border-4 sm:border-[6px] border-Dark p-4 sm:p-5">
              <span className="absolute -top-8 sm:-top-12 left-3 bg-Dark text-Yellow px-3 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl md:text-4xl -rotate-6">
                NAME
              </span>

              <input
                type="text"
                placeholder="ENTER YOUR NAME"
                className="w-full bg-transparent outline-none text-Dark text-xl sm:text-2xl md:text-3xl font-bold"
              />

              <div className="absolute left-4 right-4 bottom-3 sm:bottom-4 h-1 sm:h-1.5 bg-Dark" />
            </div>

            {/* EMAIL */}
            <div className="relative border-4 sm:border-[6px] border-Dark p-4 sm:p-5">
              <span className="absolute -top-8 sm:-top-12 left-3 bg-Dark text-Yellow px-3 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl md:text-4xl -rotate-6">
                EMAIL
              </span>

              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="w-full bg-transparent outline-none text-Dark text-xl sm:text-2xl md:text-3xl font-bold"
              />

              <div className="absolute left-4 right-4 bottom-3 sm:bottom-4 h-1 sm:h-1.5 bg-Dark" />
            </div>

            {/* MESSAGE */}
            <div className="relative border-4 sm:border-[6px] border-Dark p-4 sm:p-5 pb-6 bg-Yellow">
              <span className="absolute -top-8 sm:-top-12 left-3 bg-Dark text-Yellow px-3 sm:px-4 py-1 sm:py-2 font-bold text-lg sm:text-2xl md:text-4xl -rotate-6">
                MESSAGE
              </span>

              <textarea
                placeholder="ENTER YOUR MESSAGE"
                className="w-full h-[140px] sm:h-[180px] md:h-[220px]
                bg-transparent outline-none resize-y
                text-Dark text-xl sm:text-2xl md:text-3xl font-bold
                leading-[2.2rem] sm:leading-[2.6rem] md:leading-[2.8rem]
                [background-image:repeating-linear-gradient(
                  transparent,
                  transparent_2.4rem,
                  #1A2027_2.4rem,
                  #1A2027_2.8rem
                )] bg-local"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-Dark text-Yellow text-3xl sm:text-4xl md:text-5xl font-bold py-3 sm:py-4"
          >
            HIT UPP!
          </button>

        </form>
      </div>
    </div>
  );
}
