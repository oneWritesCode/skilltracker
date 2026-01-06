"use client"
import { useEffect, useState } from "react";


interface LoaderProps {
  isLoading?: boolean;
}

export default function Loading() {
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
const handleLoad = () => {

    setTimeout(() => {
    setIsLoading(false);
    }, 300);
};

if (document.readyState === "complete") {
    handleLoad();
} else {
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
}
}, []);
  return (
    <Loader isLoading={isLoading}/>
  )
}


const Loader = ({ isLoading }: LoaderProps) => {

  return (
    <div
      className={`
        fixed inset-0 bg-black flex flex-col items-center justify-center z-9999
        transition-all duration-500 ease-out
        ${isLoading ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
    >
       <span className="tracking-widest pb-10">
         <div className="w-12 h-12 border-4 border-yellow-900/20 border-t-white rounded-full animate-spin" />
        </span>
    </div>
  );
};
