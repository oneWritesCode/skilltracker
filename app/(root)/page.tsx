"use client";

import YourDay from "@/app/components/YourDay";
import LoginPage from "../components/LoginPage";
import { useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return <YourDay />;
  }

  return <LoginPage />;
}
