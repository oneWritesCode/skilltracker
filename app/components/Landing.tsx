import { signOut, useSession } from "next-auth/react";
import Todos from "./Todos";
import { LogOutIcon, User2 } from "lucide-react";
import RedirectLinkBtn from "./RedirectLinkBtn";
import Graph from "./Graph";

function Landing() {
  const { data: session } = useSession();

  return (
    <div className="relative w-full min-h-screen bg-black text-white md:pb-0">
      <div className="px-2 md:px-10 py-4 flex w-full items-center justify-center">
        <div className="w-full max-w-4xl">

          {/* top of the component */}
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center md:gap-4">
              <div>
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User profile"}
                    className="rounded-full md:w-auto w-20"
                  />
                ) : (
                  <div className="min-w-16 min-h-16 md:min-w-22 md:min-h-22 rounded-full bg-white/0 flex items-center justify-center">
                    <span className="border-4 rounded-full p-2 md:p-5 border-gray-200">
                      <User2 size={40} className="md:w-[60px] md:h-[60px]" />
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm md:text-base">{session?.user?.name}</p>
                <p className="text-sm md:text-base">{session?.user?.email}</p>
              </div>
            </div>
            <div className="w-full md:w-auto flex items-end justify-end flex-col gap-2">
              <button
                className="px-1.5 py-2 md:px-2 md:py-2 rounded-md md:rounded-xl bg-white/20 cursor-pointer hover:bg-red-600 transition-all font-bold text-sm md:text-base"
                title="logout"
                onClick={() => signOut()}
              >
                {/* Logout */}
                <LogOutIcon />
              </button>
            </div>
          </div>
          
          {/* bottom of the components */}
          <div>
            <Todos />
            <Graph />
          </div>

          <RedirectLinkBtn link="/day" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
