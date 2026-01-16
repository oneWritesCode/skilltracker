"use client";

import { Color, TextStyle } from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { FontSize } from "@/app/extensions/FontSize";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import { Redo, Undo, Loader2, X } from "lucide-react";

type tasksDoneType = {
  title: string;
  completed: boolean;
};

interface DayViewerProps {
  date: string;
}

export default function DayViewer({ date }: DayViewerProps) {
  const [tasksDone, setTasksDone] = useState<tasksDoneType[]>([]);
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);

  const editor = useEditor({
    editable: false,
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
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor || !date) {
      return;
    }

    setLoading(true);
    fetch(`/api/journal/${date}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (!data.exists) {
          setExists(false);
          return;
        }

        setExists(true);
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
      .catch((err) => {
        console.error("Failed to fetch journal", err);
        setLoading(false);
      });
  }, [date, editor]);

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!exists) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center text-gray-400">
        <p className="text-lg font-medium">No entry found for this day.</p>
        <p className="text-sm">You didn&apos;t write anything on {date}.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white min-h-screen flex items-center justify-center ovreflow-hidden flex-col p-4 overflow-hidden">
      <div className=" sm:min-w-2xl md:min-w-3xl xl:min-w-6xl">
        <div className="border border-gray-700 rounded-xl p-4 w-full flex items-center justify-between">
          <p className="capitalize">
            things you did on{" "}
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <form className="flex items-center gap-2 pointer-events-none opacity-50">
            <input
              type="text"
              className="border-b border-b-gray-600 py-1 outline-none"
              disabled
              placeholder="Read only"
            />
            <button
              className="bg-blue-600 rounded-sm p-1 uppercase cursor-not-allowed"
              disabled
            >
              add
            </button>
          </form>
        </div>

        <div className="flex gap-2 flex-wrap pt-4 w-full overflow-hidden capitalize">
          {tasksDone.map((singleTask, idx) => (
            <div
              key={idx}
              className="px-2 py-1 border border-gray-700 bg-white/10 rounded-md flex items-center gap-2 pointer-events-none"
            >
              <span>{singleTask.title}</span>
              <button className="text-gray-400 p-0.5" disabled>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        {/* editor */}
        <div className="bg-(--background-color) mt-10 text-gray-300 text-sm funnel-sans">
          <div className="relative w-full">
            <div className="absolute top-0 p-6 w-full flex items-center justify-center z-1000 pointer-events-none opacity-70">
              <div className="inline-flex items-center justify-center rounded-xl bg-[var(--light-background)] px-3 py-1 gap-1 mr-3">
                {/* undo button */}
                <button
                  className="h-6 w-6 hover:bg-[var(--background-color)] flex items-center justify-center rounded-full"
                  disabled
                >
                  <Undo size={18} />
                </button>

                {/* redo button */}
                <button
                  className="h-6 w-6 hover:bg-[var(--background-color)] flex items-center justify-center rounded-full"
                  disabled
                >
                  <Redo size={18} />
                </button>
              </div>

              <div className="inline-flex items-center justify-center rounded-xl bg-[var(--light-background)] px-3 py-1 gap-1">
                {/* bold  */}
                <button
                  className="h-6 hover:bg-black px-2 font-bold rounded-md"
                  disabled
                >
                  Bold
                </button>

                {/* italic  */}
                <button
                  className="h-6 hover:bg-black px-2 italic rounded-md"
                  disabled
                >
                  Italic
                </button>

                {/* strike */}
                <button
                  className="h-6 hover:bg-black px-2 line-through rounded-md"
                  disabled
                >
                  Strike
                </button>

                {/* horizontal line  */}
                <button
                  className="h-6 text-sm rounded-md font-medium px-2 hover:bg-black"
                  disabled
                >
                  Horizontal rule
                </button>

                {/* highlight */}
                <button
                  className="h-6 text-sm rounded-md font-medium px-2 hover:bg-black"
                  disabled
                >
                  Highlight
                </button>

                {/* select font size  */}
                <select
                  disabled
                  className="outline-none px-2 py-1 rounded max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar-track]:bg-neutral-700  [&::-webkit-scrollbar-thumb]:bg-neutral-500"
                >
                  <option value="">Size</option>
                </select>
              </div>
            </div>

            <div className="max-w-4x  w-full flex items-start justify-center px-10 pt-20">
              <div className="editorContent w-full py  rounded-xl shadow-lg prose prose-lg leading-relaxed pointer-events-none">
                <EditorContent
                  editor={editor}
                  className="outline-none min-h-[40vh] cursor-text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
