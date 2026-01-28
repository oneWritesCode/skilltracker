"use client";

import CardDetail from "@/app/pages/CardDetail";
import { usePathname } from "next/navigation";

export default function ExtraPage() {
  const pathname = usePathname();
  const id = pathname?.split("/").pop() || "";

  return (
    <div className="min-h-screen bg-(--background-color) w-full">
      <CardDetail id={id} />
    </div>
  );
}
