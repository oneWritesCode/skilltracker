"use client";

import Landing from "@/app/pages/profile";
import LoginPage from "../../components/LoginPage";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  if (session) {
    return <Landing />;
  }

  return <LoginPage />;
}
