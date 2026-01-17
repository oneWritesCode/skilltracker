"use client";

import { Color, TextStyle } from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { FontSize } from "@/app/extensions/FontSize";
import Image from "@tiptap/extension-image";
import { Redo, Undo, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

type Editor = {};

type tasksDoneType = {
  title: string;
  completed: boolean;
};

export default function Editor() {
  const [task, setTask] = useState<string>();
  const [tasksDone, setTasksDone] = useState<tasksDoneType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // const [journalContent, setJournalContent] = useState<any>();

  // logics and configration for editor
  const defaultContent = `
        <strong>You Can Write There Abouay</strong>
        <br />
        <br />
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
  };

  const removeTask = (indexToRemove: number) => {
    setTasksDone((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full bg-black text-white min-h-screen flex items-center justify-center ovreflow-hidden flex-col p-4 overflow-hidden">
      <div className=" sm:min-w-2xl md:min-w-3xl xl:min-w-6xl">
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
              className="px-2 py-1 border border-gray-700 bg-white/10 rounded-md flex items-center gap-2"
            >
              <span>{singleTask.title}</span>
              <button
                onClick={() => removeTask(idx)}
                className="text-gray-400 hover:text-white cursor-pointer hover:bg-white/20 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        {/* editor */}
        <div className="bg-(--background-color) mt-10 text-gray-300 text-sm funnel-sans">
          <div className="relative w-full">
            <div className="absolute top-0 p-6 w-full flex items-center justify-center z-1000">
              <div className="inline-flex items-center justify-center rounded-xl bg-[var(--light-background)] px-3 py-1 gap-1 mr-3">
                {/* undo button */}
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  className="h-6 w-6 hover:bg-[var(--background-color)] flex items-center justify-center rounded-full cursor-pointer"
                >
                  <Undo size={18} />
                </button>

                {/* redo button */}
                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  className="h-6 w-6 hover:bg-[var(--background-color)] flex items-center justify-center rounded-full cursor-pointer"
                >
                  <Redo size={18} />
                </button>
              </div>

              <div className="inline-flex items-center justify-center rounded-xl bg-[var(--light-background)] px-3 py-1 gap-1">
                {/* bold  */}
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className="h-6 hover:bg-black px-2 font-bold rounded-md cursor-pointer"
                >
                  Bold
                </button>

                {/* italic  */}
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className="h-6 hover:bg-black px-2 italic rounded-md cursor-pointer"
                >
                  Italic
                </button>

                {/* strike */}
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className="h-6 hover:bg-black px-2 line-through rounded-md cursor-pointer"
                >
                  Strike
                </button>

                {/* horizontal line  */}
                <button
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                  className="h-6 text-sm rounded-md font-medium px-2 cursor-pointer hover:bg-black"
                >
                  Horizontal rule
                </button>

                {/* highlight */}
                <button
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                  className="h-6 text-sm rounded-md font-medium px-2 cursor-pointer hover:bg-black"
                >
                  Highlight
                </button>

                {/* select font size  */}
                <select
                  onChange={(e) =>
                    editor.chain().focus().setFontSize(e.target.value).run()
                  }
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

            <div className="max-w-4x  w-full flex items-start justify-center px-10 pt-20">
              <div
                className="editorContent w-full py  rounded-xl shadow-lg prose prose-lg leading-relaxed "
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
        <div className="w-full flex justify-end items-end mt-4 relative">
          {showSuccess && (
            <div className="absolute right-0 bottom-full mb-2 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
              Submitted!
            </div>
          )}
          <button
            onClick={SaveToDb}
            disabled={isLoading}
            className="px-4 py-1 rounded-md font-bold capitalize bg-blue-600 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Saving..." : "submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
