import { signOut, useSession } from "next-auth/react";
// import { useOpenTodo } from "@/app/context/IsTodoOpenContext";
import Todos from "./Todos";
import { User2 } from "lucide-react";
import ShowNHideTodo from "./ShowNHideTodo";

function Landing() {
  const { data: session } = useSession();
  // const { setIsTodoOpen } = useOpenTodo();

  // const activateTodo = () => {
  //   setIsTodoOpen((prev) => !prev);
  // };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="px-10 py-4 flex w-full items-center gap-10 justify-center">
        <div className="w-4xl">
          {/* top of the component */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User profile"}
                    className="rounded-full"
                  />
                ) : (
                  <div className="min-w-22 min-h-22 rounded-full bg-white/0 flex items-center justify-center">
                    <span className="border-4 rounded-full p-5 border-gray-200">
                      <User2 size={60} />
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className="">{session?.user?.name}</p>
                <p className="">{session?.user?.email}</p>
              </div>
            </div>
            <div className="flex items-end flex-col gap-2">
              <button
                className="px-4 py-2 rounded-xl bg-white/20 cursor-pointer hover:bg-red-800 transition-all font-bold"
                onClick={() => signOut()}
              >
                Logout
              </button>

              <div className="flex gap-2">
                <ShowNHideTodo />
              </div>
            </div>
          </div>

          {/* bottom of the components */}
        </div>

        <Todos />
      </div>
    </div>
  );
}

export default Landing;
