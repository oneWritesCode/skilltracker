import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="w-full relative bg-(--background-color) min-h-screen flex items-center justify- ovreflow-hidden flex-col overflow-hidden font-bubblegum">
      <Navbar />
      {/* editor toolbar */}
      <div className="w-full border-b border-b-black relative top-0 p-2 md:pt-4 md:pb-2 flex items-center justify-end gap-3 overflow-x-auto z-10 capitalize px-2 md:px-4 ">
        <div className={`cursor-pointer border border-black rounded-4xl px-1 md:px-3 py-px hover:bg-black hover:text-(--background-color) transition-all`}>All</div>
        <div className={`cursor-pointer border border-black rounded-4xl px-1 md:px-3 py-px hover:bg-black hover:text-(--background-color) transition-all`}>important</div>
        <div className={`cursor-pointer border border-black rounded-4xl px-1 md:px-3 py-px hover:bg-black hover:text-(--background-color) transition-all`}>todo</div>
      </div>
    </div>
  );
}

export default Home;
