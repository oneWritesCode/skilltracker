"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LogOut, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { CgMenuLeft } from "react-icons/cg";
import InstallPWA from "./InstallPWA";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        className={`fixed top-4 left-4 p-1 group rounded-md backdrop-blur-sm hover:-gray-900/20 transition-all duration-500 cursor-pointer flex flex-col gap- z-1000 ${isOpen ? "opacity-0" : "opacity-100"}`}
        aria-label="Open Menu"
      >
        {/* <CgMenuLeft className="w-5 h-5 text-" /> */}
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
        className={`fixed top-0 left-0 h-full w-80 bg-[#D73535] shadow-2xl z-50 transform transition-transform duration-500 ease-in-out text-foreground ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#FD8A6B]">SkillTracker</h2>
            <button
              onClick={toggleNavbar}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="flex flex-col items-center p-6 mb-8 bg-black/5 rounded-2xl border border-black/10">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 border-[#FD8A6B] text-[#FD8A6B]">
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
            <h3 className="font-semibold text-lg text-foreground">
              {session?.user?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {session?.user?.email}
            </p>

            <Link
              href="/profile"
              className="mt-4 w-full"
              onClick={() => setIsOpen(false)}
            >
              <button className="w-full py-2 px-4 bg-[#FD8A6B] text-white border border-[#FD8A6B] rounded-xl hover:shadow-md transition-all text-sm font-medium cursor-pointer">
                View Profile
              </button>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 space-y-2">
            {/* <Link
              href="/day"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === "/day"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-gray-100 text-muted-foreground"
              }`}
            >
              <span>Your Day</span>
            </Link> */}

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                pathname === "/profile"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-gray-100 text-muted-foreground"
              }`}
            >
              <span>Profile</span>
            </Link>
          </div>

          <div className="cursor-pointer">
            <InstallPWA />
          </div>
          {/* Logout Button */}
          <div className="mt-auto">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
