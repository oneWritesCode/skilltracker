"use client";

import { useState, useEffect } from "react";
import LoginPage from "../../components/LoginPage";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Soon from "@/app/components/Soon";

export default function LoginButton() {
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
    return null; // Or a loading spinner
  }

  if (!session && !hasCookie) {
    return <LoginPage />;
  }

  return <Soon />;
}
