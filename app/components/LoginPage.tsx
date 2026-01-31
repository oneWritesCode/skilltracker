"use client";

import { signIn } from "next-auth/react";
import InstallPWA from "./InstallPWA";

function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-[#8B5CF6] flex items-center justify-center flex-col text-white overflow-hidden">
     
      <div className="px-10 py-4 flex flex-col w-full items-center gap-5 justify-center font-bubblegum font-light">
        <div className="relative flex borde">
          <img
            src="/images/alternateUserImageBlack.png"
            alt=""
            className="rounded-full rotate-40 translate-x-15 sm:translate-x-25 z-10"
          />{" "}
          <img
            src="/images/alternateUserImageGirl.png"
            alt=""
            className="absolute rounded-full -rotate-40 -translate-x-13 -translate-y-31 sm:-translate-x-30 sm:-translate-y-40 z-10"
          />{" "} 
          <img
            src="/images/alternateUserImageL.png"
            alt=""
            className="absolute scale-50 -rotate- translate-x-20 -translate-y-32 sm:translate-x-25 sm:-translate-y-54 z-10"
          />
          <img
            src="/images/luffy.png"
            alt=""
            className="absolute rounded-full scale-80 rotate-30 -translate-x-22 translate-y-6 sm:-translate-x-38 sm:translate-y-24 z-10"
          />
        </div>

        <button
          className="pl-2 pr-10 py-2 rounded-xl border-3 border-black bg-white cursor-pointer group hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] shadow-[6px_6px_2px_3px_rgba(0,0,0,0.3)] capitalize flex items-center gap-4 font-bold transition-all duration-100"
          onClick={() => signIn("google")}
        >
          <img src="/images/GoogleLogo.png" alt="logo" className="w-6 h-6" />
          <span className="transition-all text-black text-xl">
            Sign in with Google
          </span>
        </button>

        <div className="cursor-pointer ">
          <InstallPWA forLogin={true}/>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
