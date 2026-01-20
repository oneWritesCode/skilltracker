import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Loading from "./components/Loading";
import InstallPWA from "./components/InstallPWA";
// import { OpenTodoProvider } from "./context/IsTodoOpenContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skill Tracker",
  description: "Track your skills and improve productivity",
  manifest: "/manifest.json",
  themeColor: "#1f2937",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <InstallPWA />
          <Loading />

          {/* <OpenTodoProvider> */}
          {children}
          {/* </OpenTodoProvider> */}
        </Providers>
      </body>
    </html>
  );
}
