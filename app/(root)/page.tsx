"use client";

import Landing from "@/app/components/Landing";
import LoginPage from "../components/LoginPage";
import { useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return <Landing />;
  }

  return <LoginPage />;
}
