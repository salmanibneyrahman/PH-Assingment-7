import { useTimeline } from "../context/TimelineContext";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { FiPhone, FiMessageSquare, FiVideo, FiUsers } from "react-icons/fi";
const COLORS = {
    call: "#16a34a",
    text: "#3b82f6",
    video: "#8b5cf6",
    meetup: "#f97316",
};
const TYPE_ICONS = {
    call: FiPhone,
    text: FiMessageSquare,
    video: FiVideo,
    meetup: FiUsers,
};
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-100 rounded-lg shadow-md px-3 py-2">
                <p className="text-sm font-semibold capitalize text-gray-700">
                    {payload[0].name}
                </p>
                <p className="text-xs text-gray-500">Count: {payload[0].value}</p>
            </div>
        );
    }
    return null;
};
const CustomLegend = ({ data }) => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map(({ name, value, color }) => (
            <div key={name} className="flex items-center gap-1.5">
                <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                ></span>
                <span className="text-xs text-gray-600 capitalize">
                    {name} ({value})
                </span>
            </div>
        ))}
    </div>
);
export default function Stats() {
    const { timeline } = useTimeline();
    const counts = timeline.reduce(
        (acc, entry) => {
            const t = entry.type;
            acc[t] = (acc[t] || 0) + 1;
            return acc;
        },
        {}
    );
    const chartData = Object.entries(counts).map(([name, value]) => ({
        name,
        value,
        color: COLORS[name] || "#6b7280",
    }));
    const totalInteractions = timeline.length;
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Friendship Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Track your connection patterns and stay intentional
                    </p>
                </div>
                {/* Pie Chart Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-700 mb-1">
                        By Interaction Type
                    </h2>
                    <p className="text-xs text-gray-400 mb-6">
                        Total interactions: {totalInteractions}
                    </p>
                    <div className="flex flex-col items-center">
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <CustomLegend data={chartData} />
                    </div>
                </div>
                {/* Breakdown Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {chartData.map(({ name, value, color }) => {
                        const Icon = TYPE_ICONS[name] || FiPhone;
                        return (
                            <div
                                key={name}
                                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center"
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                                    style={{ backgroundColor: `${color}20` }}
                                >
                                    <Icon size={18} style={{ color }} />
                                </div>
                                <span className="text-2xl font-bold text-gray-800">{value}</span>
                                <span className="text-xs text-gray-500 mt-0.5 capitalize">{name}s</span>
                            </div>
                        );
                    })}
                </div>
                {/* Most Active Section */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                        Interaction Breakdown
                    </h3>
                    <div className="flex flex-col gap-3">
                        {chartData.map(({ name, value, color }) => {
                            const pct = totalInteractions
                                ? Math.round((value / totalInteractions) * 100)
                                : 0;
                            return (
                                <div key={name}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs capitalize text-gray-600 font-medium">
                                            {name}
                                        </span>
                                        <span className="text-xs text-gray-400">{pct}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-2 rounded-full transition-all duration-700"
                                            style={{ width: `${pct}%`, backgroundColor: color }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
