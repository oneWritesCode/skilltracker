import { useEffect, useState } from "react";
import "../styles/Loader.css";
import logo from "../../public/logo.svg"

const Loader = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Wait for fade-out animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`loader-overlay flex flex-col ${isLoading ? "" : "hidden"}`}>
      <img src={logo} alt="" className="w-[30vw] blink" />
      <p className="text-[2rem] py-4">LOADING<span className="">...</span> </p>
      {/* <div className="loader-spinner"></div> */}
    </div>
  );
};

export default Loader;

