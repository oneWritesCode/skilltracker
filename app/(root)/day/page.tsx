"use client";

import { useEffect, useState } from "react";
import Editor from "@/app/components/Editor";

type tasksDoneType = {
  taskName: string;
  isDone: boolean;
};

function page() {
  const [task, setTask] = useState<string>();
  const [tasksDone, setTasksDone] = useState<tasksDoneType[]>([]);
  useEffect(() => {
    setTasksDone((prev) => [
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      { taskName: "task", isDone: true },
      ...prev,
    ]);
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task?.trim()) return;

    setTasksDone((prev) => [{ taskName: task, isDone: true }, ...prev]);
    setTask("");
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center ovreflow-hidden flex-col p-4">
      <div className="w-xl sm:w-4xl xl:w-5xl lg:w-6xl">
        <div className="border border-gray-700 rounded-xl p-4 w-full flex items-center justify-between">
          <p className="capitalize">things you did today</p>
          <form className="flex items-center gap-2">
            <input
              type="text"
              className="border-b border-b-gray-600 py-1 outline-none"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              className="bg-blue-600 rounded-sm p-1 uppercase cursor-pointer"
              onClick={addTask}
            >
              add
            </button>
          </form>
        </div>

        <div className="flex gap-2 flex-wrap pt-4 w-full overflow-hidden capitalize">
          {tasksDone.map((singleTask, idx) => (
            <div
              key={idx}
              className="px-2 py-1 border- boder-gray-700 bg-white/10 rounded-md"
            >
              {singleTask.taskName}
              {singleTask.isDone}
            </div>
          ))}
        </div>

        {/* <div className="border border-gray-700 rounded-xl overflow-hidden w-full my-4">
          <label htmlFor="whatClickedToday" className="p-2 capitalize">
            what clicked today:
          </label>
          <textarea
            name="whatClickedToday"
            id="whatClickedToday"
            className="p-2 py-4 w-full outline-none border-none"
          />
        </div> */}
        <div className="bg-[var(--background-color)] mt-10 text-gray-300 text-sm funnel-sans">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default page;
