import type { Metadata } from "next";
import { Geist, Geist_Mono, Bubblegum_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
// import Loading from "./components/Loading";
import Loading from "./components/Loading";
// import { OpenTodoProvider } from "./context/IsTodoOpenContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bubblegumSans = Bubblegum_Sans({
  variable: "--font-bubblegum-sans",
  subsets: ["latin"],
  weight: "400",
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
        className={`${geistSans.variable} ${geistMono.variable} ${bubblegumSans.variable} antialiased`}
      >
        <Providers>
          <Loading />

          {/* <OpenTodoProvider> */}
          {children}
          {/* </OpenTodoProvider> */}
        </Providers>
      </body>
    </html>
  );
}
