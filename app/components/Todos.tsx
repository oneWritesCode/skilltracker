"use client";

// import { useOpenTodo } from "@/app/context/IsTodoOpenContext";
import { CrossIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BiCross, BiCut } from "react-icons/bi";

type setSkillsType = {
  content: string;
  id: string | any;
};
type SkillsFromBackendType = {
  id: string;
  skillName: String;
  userId: string;
  createdAt: string;
};

export default function skills() {
  const [skills, setSkills] = useState<setSkillsType[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // const { isTodoOpen } = useOpenTodo();

  const fetchedSkills = async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(
      data.map((skill: SkillsFromBackendType) => ({
        content: skill.skillName,
        id: skill.id,
      }))
    );
  };

  async function deleteSkill({ id }: any) {
    const res = await fetch(`api/skills/${id}`, { method: "DELETE" });
    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    fetchedSkills();
  }, []);

  const saveTodoInDB = async () => {
    const res = await fetch("api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skillName: inputValue }),
    });
    const saved = await res.json();
    setSkills((prev) => [saved, ...prev]);
  };

  const addTodo = () => {
    if (!inputValue.trim()) return;

    saveTodoInDB();

    setInputValue("");
    setShowInput(false);
  };

  return (
    <div
      className={`w-full my-4 p-2 borde-gray-600 rounded-xl transition-all duration-500 
        // isTodoOpen ? "translate-x-100 rotate-20" : ""
        `}
    >
      skills you are learning:
      <div>
        <div className="mt-5 flex gap-4">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="flex gap-4 items-center bg-white/10 p-2 rounded-xl"
            >
              {skill.content}
              <button
                onClick={() => deleteSkill(skill.id)}
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs cursor-pointer p-1 hover:bg-white/20`}
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        {showInput ? (
          <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center gap-4 backdrop-blur-xl bg-white/2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="rounded-md border border-gray-400 py-1"
            />
            <button
              onClick={addTodo}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded px-4 py-1 uppercase font-bold"
            >
              Save
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded px-4 py-1 uppercase font-bold"
            >
              cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded px-4 py-1 uppercase font-bold"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
