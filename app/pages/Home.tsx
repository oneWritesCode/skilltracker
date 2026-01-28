"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import Cookies from "js-cookie";
import { FaCalendar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface Card {
  id: string;
  title: string;
}

const DEFAULT_CARDS: Card[] = [
  { id: "gym", title: "Gym" },
  { id: "poems", title: "Poems" },
  { id: "quotes", title: "Quotes" },
];

function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const { data: session } = useSession();
  const [optimisticName, setOptimisticName] = useState<string | null>(null);

  useEffect(() => {
    const savedName = Cookies.get("sk_user_name");

    if (savedName) {
      setOptimisticName(savedName);
    }
  }, []);

  useEffect(() => {
    const savedCards = localStorage.getItem("skilltracker_cards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    } else {
      setCards(DEFAULT_CARDS);
    }
  }, []);

  const saveCards = (updatedCards: Card[]) => {
    setCards(updatedCards);
    localStorage.setItem("skilltracker_cards", JSON.stringify(updatedCards));
  };

  const addCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardTitle.trim()) return;
    const newCard = {
      id: newCardTitle.toLowerCase().replace(/\s+/g, "-"),
      title: newCardTitle.trim(),
    };
    saveCards([...cards, newCard]);
    setNewCardTitle("");
    setIsAdding(false);
  };

  const deleteCard = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedCards = cards.filter((card) => card.id !== id);
    saveCards(updatedCards);
    // Also cleanup localstorage for that card content if needed
    localStorage.removeItem(`extra_card_${id}`);
  };

  return (
    <div className="w-full relative bg-(--background-color) flex items-center min-h-screen justify-start flex-col overflow-hidden font-bubblegum">
      <Navbar />
      <div className="w-full relative top-0 p-2 md:pt-4 md:pb-2 flex items-center justify-end overflow-x-auto z-10 scrollbar-hide md:gap-3 px-2 md:px-4 ">
        <Link href="/calender" title="Calender">
          <FaCalendar size={24} />
        </Link>
        <Link href="/clock" title="Clock">
          <FaClock size={24} />
        </Link>
      </div>

      <div className="w-full flex flex-col items-center justify-center pt-10 px-4">
        <div className="border-b-3 border-b-black/20 w-full mb-4 md:mb-10 ">
          <h1 className="text-3xl md:text-6xl font-medium text-black">
            Hi {session?.user?.name || optimisticName},
          </h1>
          <p className="max-w-lg pb-2 ">how's your day?</p>
        </div>

        <div className="relative w-full">
          <div className="absolute right-0 top-0 min-w-25 h-full -50 bg-gradient-to-l from-(--background-color) via-(--background-color)/60 to-white/0 backdrop-blurxl z-30 "></div>
          <div className="flex relative gap-4 md:gap-6 w-full pb-4 pr-10 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:w-2">
            {cards.map((card) => (
              <Link
                key={card.id}
                href={`/extra/${card.id}`}
                className="group w-22 md:min-w-75 relative h-20 md:h-32 bg-(--red-backround) border-2 border-black rounded-2xl md:rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-400 flex items-center justify-center cursor-pointer"
              >
                <h3 className=" md:text-3xl font-bold text-black uppercase tracking-wider">
                  {card.title}
                </h3>
                <button
                  onClick={(e) => deleteCard(card.id, e)}
                  className="absolute top-0 right-0 md:top-4 md:right-4 p-2 rounded-full hover:bg-red-100 text-red-500 md:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={20} className="hidden md:block" />
                  <Trash2 size={18} className="md:hidden block" />
                </button>
              </Link>
            ))}
            <button
              onClick={() => setIsAdding(true)}
              className="relative min-w-22 md:min-w-75 h-20 md:h-32 bg-black text-white rounded-2xl md:rounded-3xl flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 cursor-pointer border-2 border-(--background-color)/40"
            >
              <div className="absolute w-4 border-white border-2 rounded-full"></div>
              <div className="absolute w-4 border-white border-2 rounded-full rotate-90"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}

      {/* Add Card Modal-ish overlay */}
      {isAdding && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white border-4 border-black p-8 rounded-3xl w-full max-w-md shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-4">Add New Card</h2>
            <form onSubmit={addCard}>
              <input
                autoFocus
                type="text"
                placeholder="Title (e.g. Gym, Poems...)"
                className="w-full border-2 border-black p-3 rounded-xl mb-6 outline-none focus:bg-yellow-50"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-xl font-bold hover:bg-neutral-800"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 border-2 border-black py-3 rounded-xl font-bold hover:bg-neutral-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* <footer className="w-full bottom-0 border-t-2border-black font-sans">
        <div className="max-w-4xl mx-auto pb-10">
          <div className="mt-12 md:mt-16 pt-8 border-t-2 border-black/10 flex flex-col mdflex-row justify-between items-center gap-4">
            <p className="text-sm font-black uppercase">
              Created by{" "}
              <Link href="d33pak.space" className="text-[#FA5C5C]">
                Deepak
              </Link>{" "}
              @2026
            </p>
            <p className="text-xs font-bold text-muted-foreground uppercase opacity-50">
              © 2026 SkillTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default Home;
