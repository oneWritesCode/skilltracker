import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Todos from "../components/Todos";
import { User2 } from "lucide-react";
// import RedirectLinkBtn from "./RedirectLinkBtn";
import Graph from "../components/Graph";
import Navbar from "../components/Navbar";

function Landing() {
  const { data: session } = useSession();
  const [optimisticEmail, setOptimisticEmail] = useState<string | null>(null);
  const [optimisticName, setOptimisticName] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = Cookies.get("sk_user_email");
    const savedName = Cookies.get("sk_user_name");
    if (savedEmail) {
      setOptimisticEmail(savedEmail);
    }
    if (savedName) {
      setOptimisticName(savedName);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-(--background-color) text-foreground md:pt-0 pt-6">
      <div className="px-2 md:px-10 py-4 flex w-full items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* <InstallPWA /> */}
          <Navbar />
          {/* top of the component */}
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-full flex items-center justify-center border-3 border-transparent">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User profile"}
                    className="rounded-full border-white border-3"
                  />
                ) : (
                  <div className="min-w-16 min-h-16 md:min-w-22 md:min-h-22 rounded-full flex items-center justify-center">
                  <img src="/images/alternateUserImage.png" alt="" className="rounded-full w-full" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-lg text-foreground">
                  {session?.user?.name || optimisticName}
                </h3>
                <p className="text-xs font-semibold text-muted-foreground">
                  {session?.user?.email || optimisticEmail}
                </p>
              </div>
            </div>
          </div>

          {/* bottom of the components */}
          <div>
            <Todos />
            <Graph />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
