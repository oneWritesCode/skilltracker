import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function Soon() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-(--background-color) font-bubblegum text-5xl">
      <h1>Coming Soon...</h1>
      <p className="text-sm text-(--text-color)/50">we are working on it, stay calm.</p>
      <div className="p-2 md:pt-10 md:pb-2 flex items-center justify-between gap-3 px-2 md:px-4 text-sm">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold hover:scale-105 transition-transform"
        >
          <ArrowLeft size={20} />
          <span>Back to home page</span>
        </Link>
      </div>
    </div>
  );
}

export default Soon;
