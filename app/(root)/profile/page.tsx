"use client";

import { useState, useEffect } from "react";
import Landing from "@/app/pages/profile";
import LoginPage from "../../components/LoginPage";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

export default function Profile() {
  const { data: session } = useSession();
  const [hasCookie, setHasCookie] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const cookie = Cookies.get("sk_user_email");
    if (cookie) {
      setHasCookie(true);
    }
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return null;
  }

  if (!session && !hasCookie) {
    return <LoginPage />;
  }

  return <Landing />;
}
