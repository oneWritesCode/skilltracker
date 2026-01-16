"use client";

import DayViewer from "@/app/components/DayViewer";
import { usePathname } from "next/navigation";

export default function DayPage() {
  const pathname = usePathname();
  const id = pathname?.split("/").pop() || "";

  return (
    <div className="min-h-screen bg-black w-full pt-20">
      <DayViewer date={id} />
    </div>
  );
}
