"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = 2026; // As requested: @2026

  const socialLinks = [
    {
      name: "Github",
      icon: <Github size={20} />,
      href: "https://github.com/onewritescode",
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      href: "https://x.com/triordeep",
    },
    {
      name: "Linkedin",
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      href: "https://instagram.com/deepak._.126",
    },
  ];

  return (
    <footer className="w-full bg-(--light-background) border-t-2border-black ">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-black text-[#FA5C5C] uppercase tracking-tighter mb-2">
              SkillTracker
            </h2>
            <p className="text-sm font-bold text-gray-700 max-w-xs">
              Empowering your learning journey, one skill at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-black uppercase">Follow Me</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-end gap-3 text-sm font-bold">
            <Link href="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t-2 border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-black uppercase">
            Created by <span className="text-[#FA5C5C]">Deepak</span> @
            {currentYear}
          </p>
          <p className="text-xs font-bold text-muted-foreground uppercase opacity-50">
            © {currentYear} SkillTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
