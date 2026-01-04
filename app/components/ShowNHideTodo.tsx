// "use client";

// // import { useOpenTodo } from "@/app/context/IsTodoOpenContext";
// import { MdDoubleArrow } from "react-icons/md";

// export default function ShowNHideTodo() {
//   const { isTodoOpen } = useOpenTodo();
//   const { setIsTodoOpen } = useOpenTodo();

//   // const activateTodo = () => {
//   //   setIsTodoOpen((prev) => !prev);
//   // };

//   return (
//     <button
//       className="px-2 py-1 rounded-[12px] border border-gray-500 cursor-pointer hover:bg-white/20 transition-all font-medium"
//       onClick={activateTodo}
//     >
//       <div className={`transition-all duration-500 ${isTodoOpen ? "rotate-0" : "rotate-180"} `}>
//         <MdDoubleArrow size={30}/>
//       </div>
//     </button>
//   );
// }
