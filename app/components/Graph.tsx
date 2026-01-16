"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type GraphData = {
  date: string;
  count: number;
};

export default function Graph() {
  const [data, setData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/graph")
      .then((res) => res.json())
      .then((items: GraphData[]) => {
        const dataMap: Record<string, number> = {};
        items.forEach((item) => {
          dataMap[item.date] = item.count;
        });
        setData(dataMap);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch graph data", err);
        setLoading(false);
      });
  }, []);

  // Generate date array for the grid
  const days = [];
  const today = new Date();

  // Calculate start date: go back 1 year
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 365);

  // Adjust startDate to the previous Sunday
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  // Generate days until we reach today or slightly past to fill the grid columns
  const currentDate = new Date(startDate);
  while (currentDate <= today) {
    days.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate weeks for month labels
  // We need to know which weeks start a new month
  const weeks: any[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-900/10 border-gray-800/90";
    if (count <= 2) return "bg-blue-900/50 border-blue-800";
    if (count <= 4) return "bg-blue-900/70 border-blue-800";
    if (count <= 6) return "bg-blue-900 border-blue-800";
    return "bg-blue-300 border-blue-200";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getMonthLabel = (weekIndex: number) => {
    // Get the first day of the week
    const weekStartDate = new Date(weeks[weekIndex][0]);
    const month = weekStartDate.toLocaleString("default", { month: "short" });

    // Check if this week starts a new month relative to the previous week
    if (weekIndex === 0) return month;

    const prevWeekStartDate = new Date(weeks[weekIndex - 1][0]);
    const prevMonth = prevWeekStartDate.toLocaleString("default", {
      month: "short",
    });

    if (month !== prevMonth) {
      return month;
    }
    return "";
  };

  if (loading) {
    return (
      <div className="w-full mt-10 p-4 border border-gray-800 rounded-xl bg-black/40 animate-pulse h-[200px]"></div>
    );
  }

  return (
    <div className="w-full mt-10 p-3 border border-gray-800 rounded-xl bg-black/40 backdrop-blur-sm relative overflow-hidden">
      <h3 className="text-gray-400 mb-3 text-sm font-medium uppercase tracking-wider">
        Activity Graph
      </h3>

      <div className="flex gap-2">
        {/* Day Labels (Left Axis) */}
        <div className="grid grid-rows-7 gap-1 text-[10px] text-gray-400 font-medium h-full pt-[20px]">
          {/* pt-5 to align with the grid below the month headers */}
          <span className="h-3 flex items-center">Sun</span>
          <span className="h-3 flex items-center">Mon</span>
          <span className="h-3 flex items-center">Tue</span>
          <span className="h-3 flex items-center">Wed</span>
          <span className="h-3 flex items-center">Thu</span>
          <span className="h-3 flex items-center">Fri</span>
          <span className="h-3 flex items-center">Sat</span>
        </div>

        {/* Graph + Month Labels */}
        <div className="flex flex-col relative overflow-hidden">
          {/* Month Labels (Top Axis) */}
          <div className="flex text-[12px] text-gray-400 mb-2 h-3 sticky left-0">
            {weeks.map((week, i) => (
              <div
                key={i}
                className="w-4 mr-1 text-center overflow-visible whitespace-nowrap"
              >
                {getMonthLabel(i)}
              </div>
            ))}
          </div>

          {/* Github Style Grid */}
          <div className="overflow-x-auto pb-2 scrollbar-hide [&::-webkit-scrollbar]:w-2">
            <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
              {days.map((date) => {
                const count = data[date] || 0;
                return (
                  <Link href={`/day/${date}`} key={date} className="block">
                    <div
                      title={`${date}: ${count} tasks`}
                      className={`w-3 h-3 rounded-sm border ${getColor(
                        count
                      )} transition-all duration-300 hover:scale-125 cursor-pointer`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
