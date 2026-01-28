"use client";

import Navbar from "../../components/Navbar";

export default function PrivacyPage() {
  return (
    <div className="relative w-full min-h-screen bg-(--background-color) text-foreground pt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-black pb-4">
          Privacy Policy
        </h1>

        <div className="space-y-8 font-bold text-lg">
          <section>
            <h2 className="text-2xl font-black uppercase mb-4 text-[#FA5C5C]">
              1. Data Collection
            </h2>
            <p>
              We collect your email and name when you sign in via Google to
              personalize your experience and sync your data across devices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-4 text-[#FA5C5C]">
              2. Cookies
            </h2>
            <p>
              We use local cookies to store your session information and provide
              a faster loading experience (optimistic UI).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-4 text-[#FA5C5C]">
              3. Data Security
            </h2>
            <p>
              Your data is stored securely. We do not sell your personal
              information to third parties.
            </p>
          </section>

          <section className="pt-8 border-t-2 border-black/10">
            <p className="text-sm opacity-60">Last updated: January 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
