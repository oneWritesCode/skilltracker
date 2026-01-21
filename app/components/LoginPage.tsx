import { signIn } from "next-auth/react";

function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center flex-col text-white">
      <div className="px-10 py-4 flex w-full items-center gap-10 justify-center">
        <button
          className="pl-1 pr-10 py-1 rounded-3xl bg-white/10 cursor-pointer group border border-gray-700 flex items-center gap-4 font-bold"
          onClick={() => signIn("google")}
        >
          <img src="/images/GoogleLogo.png" alt="logo" className="w-8 h-8" />
          <span className="group-hover:scale-108 transition-all">
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
