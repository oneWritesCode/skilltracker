"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="px-10 py-4 flex w-full items-center gap-10 justify-center">
        <button
          className="px-4 py-2 rounded-xl bg-white/20 cursor-pointer hover:bg-red-800 transition-all font-bold"
          onClick={() => signOut()}
        >
          Logout
        </button>
        <p className="p-4 rounded-xl">Signed in as {session.user?.email}</p>
      </div>
    );
  }

  return (
    <div className="px-10 py-4 flex w-full items-center gap-10 justify-center">
      <button
        className="px-10 py-1 rounded-2xl bg-white/10 cursor-pointer hover:bg-white/20 border border-gray-500 transition-all font-bold"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}
