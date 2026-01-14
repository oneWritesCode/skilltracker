"use client";

import { Color, TextStyle } from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { FontSize } from "@/app/extensions/FontSize";
import Image from "@tiptap/extension-image";
import { Redo, Undo } from "lucide-react";

type Editor = {

}

export default function Editor() {
  // const [isSaved, setIsSaved] = useState(false)
  // const [popUpText, setPopUpText] = useState();

  // const savingWriting = () => {
  //     if (!editor) return
  //     const content = editor.getJSON()
  //     localStorage.setItem("editorContent", JSON.stringify(content))
  //     setPopUpText(<> <span className='text-green-400 text-xs '><Check size={18} /> </span>we saved your writing, now go and touch some grass</>)
  //     showPopUp()
  // }
  // const clearingWriting = () => {
  //     localStorage.removeItem("editorContent")
  //     setPopUpText(<> <span className='text-red-400 text-xs '><Check size={18} /> </span>we cleared your shit now write some text</>)
  //     showPopUp()
  // }

  // function showPopUp() {
  //     setIsSaved(true);
  //     setTimeout(() => {
  //         setIsSaved(false)
  //     }, 2000)
  // }

  const defaultContent = `
        <strong>You Can Write There About Your Day</strong>
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
    //   Color,
      Highlight,
      FontSize,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    content: defaultContent,
    // content: (() => {
    //     const savedContent = localStorage.getItem("editorContent")
    //     return savedContent ? JSON.parse(savedContent) : defaultContent;
    // })(),

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

  return (
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
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
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

          {/* change text color */}
          {/* <input
            type="color"
            onInput={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            className="h-7 w-7 text-sm cursor-pointer hover:bg-[var(--light-background)] border-white/50 "
          /> */}
        </div>

        {/* <div className='inline-flex items-center hover:bg-red-700 font-bold hover:text-white transition-all justify-center rounded-xl bg-[var(--light-background)] gap-1 ml-3'>
                    undo button 
                    <button
                        onClick={clearingWriting}
                        className='capitalize text-xs flex items-center px-3 py-1 justify-center rounded-full cursor-pointer'
                    >
                        clear storage
                    </button>
                </div> */}
      </div>

      {/* <div className='fixed bottom-[12vh] w-full flex items-center justify-center'>
                <button
                    className='bg-[var(--light-background)] absolute right-[7vw] px-4 py-2 flex items-center justify-center gap-2 rounded-xl font-bold cursor-pointer hover:bg-black transition'
                    onClick={savingWriting}
                >
                    Save writing <span className='text-gray-300'> <CloudCheck /></span>
                </button>
            </div> */}

      {/* <div className='fixed top-[15vh] w-full flex items-center justify-center'>
                <div className={`bg-[var(--light-background)] absolute right-[4vw] px-3 py-2 flex items-center text-xs justify-center gap-2 rounded-xl font-medium transition-all duration-1000 z-1000 capitalize ${isSaved ? "translate-x-[0vw]" : "translate-x-[100vw]"}`}>{popUpText}</div>
            </div> */}

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
  );
}
