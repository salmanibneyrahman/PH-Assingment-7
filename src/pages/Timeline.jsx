import { useState } from "react";
import { useTimeline } from "../context/TimelineContext";
const typeConfig = {
  Call: {
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  Text: {
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  Video: {
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },

};
export default function Timeline() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Call", "Text", "Video"];
  const filtered =
    filter === "All" ? entries : entries.filter((e) => e.type === filter);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Timeline</h1>
        {/* Filter Dropdown */}
        <div className="mb-6">
          <div className="relative w-56">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-gray-500 text-sm focus:outline-none focus:border-gray-300 cursor-pointer"
            >
              <option value="All">Filter timeline</option>
              <option value="Call">Call</option>
              <option value="Text">Text</option>
              <option value="Video">Video</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-gray-700 font-semibold mb-2">No timeline entries yet</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              {filter === "All"
                ? "Go to a friend's page and log a Call, Text, or Video to start building your timeline."
                : `No ${filter} entries yet. Log a ${filter} with a friend to get started.`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((entry) => {
              const config = typeConfig[entry.type] || typeConfig.Call;
              return (
                <div
                  key={entry.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"
                >
                  {/* Icon bubble */}
                  <div
                    className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    {config.icon}
                  </div>
                  {/* Content */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {entry.type}{" "}
                      <span className="font-normal text-gray-500">
                        with {entry.friendName}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{entry.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}