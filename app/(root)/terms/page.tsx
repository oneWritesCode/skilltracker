"use client";

import Navbar from "../../components/Navbar";

export default function TermsPage() {
  return (
    <div className="relative w-full min-h-screen bg-(--background-color) text-foreground pt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-black pb-4">
          Terms & Conditions
        </h1>

        <div className="space-y-8 font-bold text-lg">
          <section>
            <h2 className="text-2xl font-black uppercase mb-4 text-[#FA5C5C]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using SkillTracker, you agree to be bound by
              these Terms and Conditions. If you do not agree, please do not use
              the application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-4 text-[#FA5C5C]">
              2. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and session. All activities that occur under your account
              are your responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-4 text-[#FA5C5C]">
              3. Content
            </h2>
            <p>
              SkillTracker allows you to store tasks and notes. You retain
              ownership of your content, but grant us a license to host it for
              you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-4 text-[#FA5C5C]">
              4. Limitation of Liability
            </h2>
            <p>
              SkillTracker is provided "as is" without any warranties. We are
              not liable for any data loss or productivity issues.
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
