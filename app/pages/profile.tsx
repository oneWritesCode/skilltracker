import { useSession } from "next-auth/react";
import Todos from "../components/Todos";
import { User2 } from "lucide-react";
// import RedirectLinkBtn from "./RedirectLinkBtn";
import Graph from "../components/Graph";
import Navbar from "../components/Navbar";

function Landing() {
  const { data: session } = useSession();

  return (
    <div className="relative w-full min-h-screen bg-(--background-color) text-foreground md:pb-0">
      <div className="px-2 md:px-10 py-4 flex w-full items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* <InstallPWA /> */}
          <Navbar />
          {/* top of the component */}
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-full flex items-center justify-center border-3 border-white/70 text-[#FD8A6B]">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User profile"}
                    className="rounded-full -20"
                  />
                ) : (
                  <div className="min-w-16 min-h-16 md:min-w-22 md:min-h-22 rounded-full bg-white/0 flex items-center justify-center">
                    <span className="border-4 rounded-full p-2 md:p-5 border-gray-200">
                      <User2 size={40} className="md:w-[60px] md:h-[60px]" />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-lg text-foreground">
                  {session?.user?.name}
                </h3>
                <p className="text-xs font-semibold text-muted-foreground">
                  {session?.user?.email}
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
