"use client";

import { TextStyle } from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { FontSize } from "@/app/extensions/FontSize";
import Image from "@tiptap/extension-image";
import { Redo, Undo, Loader2, X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type Editor = {};

type tasksDoneType = {
  title: string;
  completed: boolean;
};

export default function Editor() {
  const [task, setTask] = useState<string>("");
  const [tasksDone, setTasksDone] = useState<tasksDoneType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  // logics and configration for editor
  const defaultContent = `
       <strong>You Can Write There About your day</strong>
       <br />
       <br />
      - &nbsp; "What did you get up to today?"
       <br />
      - &nbsp; "How are you really feeling?"
       <br />
      - &nbsp; "What's been on your mind?" 
    `;

  const editor: Editor | any = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      TextStyle,
      Highlight,
      FontSize,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    content: defaultContent,

    editorProps: {
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find((item) => item.type.includes("image"));

        if (imageItem) {
          const file: File | any = imageItem.getAsFile();
          const reader = new FileReader();
          reader.onload = () => {
            const src = reader.result;
            editor
              .chain()
              .focus()
              .setImage({
                src,
                width: "300px",
                height: "auto",
              })
              .run();
          };
          reader.readAsDataURL(file);
          return true;
        }
        return false;
      },
    },
    // setting this only to avoid errors form next.js server side rendering
    immediatelyRender: false,
  });

  // saving data to database
  const SaveToDb = async () => {
    if (!editor) return;
    setIsLoading(true);
    let content = editor.getJSON();
    content = JSON.stringify(content);
    console.log(content);

    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          journalContent: content,
          tasks: tasksDone,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      if (!res.ok) {
        console.log("here you go with response from backend", res);
        return;
      }
      console.log("saved you entry of the day");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving journal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // fetching journaldata form backned
  useEffect(() => {
    if (!editor) return;

    const date = new Date().toISOString().split("T")[0];
    fetch(`/api/journal/${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.exists) return;

        console.log(data);

        if (data.journal.tasks) {
          setTasksDone(data.journal.tasks);
        }

        if (data.journal.journalContent) {
          try {
            const parsedContent = JSON.parse(data.journal.journalContent);
            editor.commands.setContent(parsedContent);
          } catch (e) {
            console.error("Error parsing journal content:", e);
          }
        }
      })
      .catch((err) => console.error("Failed to fetch journal", err));
  }, [editor]);

  // logics and script for task component
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task?.trim()) return;

    setTasksDone((prev) => [{ title: task, completed: true }, ...prev]);
    setTask("");
    setIsAddingTask(false);
  };

  const removeTask = (indexToRemove: number) => {
    setTasksDone((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full relative bg-(--background-color) min-h-screen flex items-center justify- ovreflow-hidden flex-col overflow-hidden font-bubblegum">
    <Navbar/>
      {/* editor toolbar */}
      <div className="w-full border border-b-black relative top-0 p-2 md:pt-4 md:pb-2 w-full flex items-center md:justify-end overflow-x-auto z-10 scrollbar-hide md:gap-1 px-2 md:px-4 ">
        <div className="inline-flex items-center justify-center rounded-xl px-2 py-1 md:gap-1 mr-2 md:px-3 md:mr-3 ">
          {/* undo button */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            title="undo"
            className="h-6 w-6 hover:bg-[--background-color] flex items-center justify-center rounded-full cursor-pointer"
          >
            <Undo size={18} />
          </button>

          {/* redo button */}
          <button
            onClick={() => editor.chain().focus().redo().run()}
            title="redo"
            className="h-6 w-6 hover:bg-[--background-color] flex items-center justify-center rounded-full cursor-pointer"
          >
            <Redo size={18} />
          </button>
        </div>

        <div className="inline-flex items-center justify-center rounded-xl px-1 md:px-3 py-1 md:gap-1 text-xs md:text-base">
          {/* bold  */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="bold"
            className="h-6 hover:bg-black px-2 font-bold rounded-md cursor-pointer"
          >
            B
          </button>

          {/* italic  */}
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
            className="h-6 hover:bg-black px-2 italic rounded-md cursor-pointer font-serif"
          >
            I
          </button>

          {/* strike */}
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="strike"
            className="h-6 hover:bg-black px-2 line-through rounded-md cursor-pointer"
          >
            Strike
          </button>

          {/* horizontal line  */}
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal rule"
            className="h-6 text-sm rounded-md font-medium px-2 cursor-pointer hover:bg-black"
          >
            __
          </button>

          {/* highlight */}
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            title="highlight"
            className="h-6 text-sm rounded-md font-medium px-2 cursor-pointer hover:bg-black"
          >
            Highlight
          </button>

          {/* select font size  */}
          <select
            onChange={(e) =>
              editor.chain().focus().setFontSize(e.target.value).run()
            }
            title="font size"
            className="outline-none px-2 py-1 rounded max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar-track]:bg-neutral-700  [&::-webkit-scrollbar-thumb]:bg-neutral-500 cursor-pointer"
          >
            {Array.from({ length: 100 }, (_, i) => (
              <option
                key={i}
                value={`${i}px`}
                className="h-6 w-6 text-sm bg-black/90"
              >
                {i}px
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* page and the content */}
      <div className="w-full max-w-full px-2 md:px-4 pt-4">
        <div className="rounded-xl w-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <p className="capitalize text-sm md:text-3xl text-left w-full">
            your tasks
          </p>
        </div>

        <div className="flex gap-2 flex-wrap pt-4 w-full overflow-hidden capitalize items-center">
          {tasksDone.map((singleTask, idx) => (
            <div
              key={idx}
              className="px-2 py-1 bg-[#000] text-white rounded-2xl flex items-center gap-2"
            >
              <span>{singleTask.title}</span>
              <button
                onClick={() => removeTask(idx)}
                className="text-white cursor-pointer hover:bg-white/20 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {isAddingTask ? (
            <form onSubmit={addTask} className="flex items-center gap-2">
              <input
                type="text"
                autoFocus
                className="w-32 ring-2 ring-neutral-800 shadow-sm shadow-neutral-400 rounded-xl px-2 py-0.5 outline-none bg-transparent text-black text-sm m-1"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onBlur={() => !task && setIsAddingTask(false)}
              />
              <button
                type="submit"
                className="bg-black text-white rounded-xl px-3 py-0.5 uppercase cursor-pointer text-sm font-bold transition-colors"
                onMouseDown={(e) => e.preventDefault()}
              >
                add
              </button>
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="p-0.5 rounded-full text-black transition-colors cursor-pointer hover:bg-black hover:text-white"
              >
                <X size={16} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsAddingTask(true)}
              className="p-1.5 rounded-full text-black transition-colors cursor-pointer border border-black hover:bg-black hover:text-white"
              title="Add task"
            >
              <Plus size={16} fontWeight={"bold"}/>
            </button>
          )}
        </div>

        {/* editor */}
        <div className="mt-10 text-sm">
          <div className="relative w-full">
            {/* editor content */}
            <div className="max-w-4x w-full flex items-start justify-center px-2 text-">
              <div
                className="editorContent w-full py rounded-xl prose prose-sm md:prose-lg leading-relaxed "
                onClick={() => editor?.commands.focus()}
              >
                <EditorContent
                  editor={editor}
                  className="outline-none min-h-[40vh] cursor-text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-start items-end mt-4 relative">
          {/* {showSuccess && (
            <div className="absolute right-0 bottom-full mb-2 text-white px-3 py-1 rounded-md text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
              Submitted!
            </div>
          )} */}
          <button
            onClick={SaveToDb}
            disabled={isLoading}
            className="px-6 py-2 rounded-3xl font-bold capitalize bg-black text-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Saving..." : showSuccess? "Submitted!":"submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
