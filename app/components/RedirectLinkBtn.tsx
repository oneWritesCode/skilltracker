"use client";
import Link from "next/link";

type PropsType = {
  text: string;
  link: string;
};

function RedirectLinkBtn({ text, link }: PropsType) {
  return (
    <Link
      href={link}
      className="absolute bottom-10 right-10 bg-blue-600 rounded-xl p-2 font-bold capitalize"
    >
      {text}
    </Link>
  );
}

export default RedirectLinkBtn;
