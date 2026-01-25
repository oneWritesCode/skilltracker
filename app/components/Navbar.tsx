"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LogOut, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import InstallPWA from "./InstallPWA";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [optimisticEmail, setOptimisticEmail] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check for cookie on mount - "if cookies are there"
    const savedEmail = Cookies.get("sk_user_email");
    if (savedEmail) {
      setOptimisticEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      Cookies.set("sk_user_email", session.user.email, { expires: 7 });
    }
  }, [session]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Mock user data - normally this would come from useSession()
  const user = {
    name: "John Doe",
    email: "john@example.com",
    image: null,
  };

  return (
    <>
      {/* Mobile Hamburger Trigger - Visible when closed */}
      <button
        onClick={toggleNavbar}
        className={`fixed top-3 left-3 md:top-4 md:left-4 p-1 group rounded-md backdrop-blur-sm hover:-gray-900/20 transition-all duration-500 cursor-pointer flex flex-col gap- z-1000 ${isOpen ? "opacity-0" : "opacity-100"}`}
        aria-label="Open Menu"
      >
        <div
          className={`w-2 border-2 rounded-full border-black hover group-hover:w-4 transition-all duration-400 mb-0.5`}
        ></div>
        <div
          className={`w-4 border-2 rounded-full border-black hover group-hover:w-3 transition-all duration-400 mb-0.5`}
        ></div>
        <div
          className={`w-3 border-2 rounded-full border-black hover group-hover:w-5 transition-all duration-400 `}
        ></div>
      </button>

      {/* Overlay for mobile/desktop when open */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full max-w-full w-80 bg-(--light-background) shadow-2xl z-50 transform transition-transform duration-500 ease-in-out text-foreground  font-funnelsans ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <h2 className="text-xl font-bold text-[#FA5C5C] uppercase">
              SkillTracker
            </h2>
            <button
              onClick={toggleNavbar}
              className="p-3 group relative cursor-pointer"
            >
              <div
                className={`w-4 group-hover:w-3 group-hover:-rotate-45 group-hover:top-2 group-hover:left-1 absolute right-1 top-2.5 rotate-45 border-2 rounded-full border-black hover transition-all duration-400 `}
              ></div>
              <div
                className={`w-4 group-hover:w-3 group-hover:rotate-45 group-hover:top-4 group-hover:left-1 absolute right-1 top-2.5 -rotate-45 border-2 rounded-full border-black hover transition-all duration-400 `}
              ></div>
            </button>
          </div>

          {/* User Profile Section */}
          <div className="flex gap-2 md:mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-3 border-white/70 text-[#FD8A6B]">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "User profile"}
                  className="rounded-full -20"
                />
              ) : (
                <div className="min-w-16 min-h-16 md:min-w-22 md:min-h-22 rounded-full bg-white/0 flex items-center justify-center">
                  <span className="border-4 rounded-full p-2 md:p-5 border-gray-200">
                    <User2 size={40} className="md:w-[60px] md:h-[60px]" />
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-lg text-foreground">
                {session?.user?.name}
              </h3>
              <p className="text-xs font-semibold text-muted-foreground">
                {session?.user?.email || optimisticEmail}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-xl transition-all cursor-pointer ${
                pathname === "/"
                  ? "bg-[#FD8A6B] text-white border-2  border-[#FD8A6B]"
                  : "text-black border-2 border-black hover:border-[#FD8A6B] hover:bg-[#FD8A6B] hover:text-white"
              }`}
            >
              <button className="w-full py-2 px-4 rounded-xl transition-all text-sm font-bold cursor-pointer">
                Your Day
              </button>
            </Link>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-xl transition-all cursor-pointer ${
                pathname === "/profile"
                  ? "bg-[#FD8A6B] text-white border-2  border-[#FD8A6B]"
                  : "text-black border-2 border-black hover:border-[#FD8A6B] hover:bg-[#FD8A6B] hover:text-white"
              }`}
            >
              <button className="w-full py-2 px-4 rounded-xl transition-all text-sm font-bold cursor-pointer">
                View Profile
              </button>
            </Link>
          </div>

          <div className="cursor-pointer">
            <InstallPWA />
          </div>

          {/* Logout Button */}
          <div className="mt-auto">
            <button
              className="inline-flex items-center gap-3 px-4 py-2 w-full rounded-xl bg-[#D73535] text-white transition-all font-bold cursor-pointer"
              title="logout"
              onClick={() => {
                Cookies.remove("sk_user_email");
                signOut();
              }}
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
