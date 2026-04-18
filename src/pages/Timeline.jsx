import { useState } from "react";
import { useTimeline } from "../context/TimelineContext";
import {
    FiPhone,
    FiMessageSquare,
    FiVideo,
    FiUsers,
    FiFilter,
} from "react-icons/fi";
const typeConfig = {
    call: {
        label: "Call",
        Icon: FiPhone,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        badgeBg: "bg-green-100",
        badgeText: "text-green-700",
    },
    text: {
        label: "Text",
        Icon: FiMessageSquare,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-700",
    },
    video: {
        label: "Video",
        Icon: FiVideo,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        badgeBg: "bg-purple-100",
        badgeText: "text-purple-700",
    },
    meetup: {
        label: "Meetup",
        Icon: FiUsers,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        badgeBg: "bg-orange-100",
        badgeText: "text-orange-700",
    },
};
const filterOptions = ["All", "Call", "Text", "Video", "Meetup"];
export default function Timeline() {
    const { timeline } = useTimeline();
    const [activeFilter, setActiveFilter] = useState("All");
    const filtered =
        activeFilter === "All"
            ? timeline
            : timeline.filter(
                (entry) => entry.type.toLowerCase() === activeFilter.toLowerCase()
            );
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Timeline</h1>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <FiFilter size={14} />
                        <span className="hidden sm:inline">Filter</span>
                    </div>
                </div>
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {filterOptions.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setActiveFilter(opt)}
                            className={`btn btn-xs rounded-full px-4 border-none transition-all ${activeFilter === opt
                                    ? "bg-[#1a5c38] text-white"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
                {/* New Timeline label */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        New Timeline
                    </span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                {/* Timeline Entries */}
                <div className="flex flex-col gap-0">
                    {filtered.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <FiFilter size={32} className="mx-auto mb-3 opacity-40" />
                            <p className="text-sm">No entries found for this filter.</p>
                        </div>
                    ) : (
                        filtered.map((entry, index) => {
                            const config = typeConfig[entry.type] || typeConfig["call"];
                            const { Icon, iconBg, iconColor, badgeBg, badgeText, label } = config;
                            return (
                                <div key={entry.id} className="flex gap-3 group">
                                    {/* Timeline line */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0 mt-1`}
                                        >
                                            <Icon size={16} className={iconColor} />
                                        </div>
                                        {index < filtered.length - 1 && (
                                            <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="pb-5 flex-1">
                                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {entry.title}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-0.5">
                                                        {entry.date}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${badgeBg} ${badgeText}`}
                                                >
                                                    {label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
