"use client";

import { signIn } from "next-auth/react";

function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-(--background-color) flex items-center justify-center flex-col text-white">
      <div className="px-10 py-4 flex w-full items-center gap-10 justify-center">
        <button
          className="pl-2 pr-10 py-2 rounded-3xl bg-(--red-background) cursor-pointer group border border-(--red-background) capitalize flex items-center gap-4 font-bold"
          onClick={() => signIn("google")}
        >
          <img src="/images/GoogleLogo.png" alt="logo" className="w-6 h-6" />
          <span className="group-hover:scale-108 transition-all">
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
