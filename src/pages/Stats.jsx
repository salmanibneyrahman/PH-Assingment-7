import { useTimeline } from "../context/TimelineContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
const COLORS = {
  Call: "#1a5c38",
  Text: "#3b82f6",
  Video: "#a855f7",
};
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Stats() {
  const { entries } = useTimeline();
  const callCount = entries.filter((e) => e.type === "Call").length;
  const textCount = entries.filter((e) => e.type === "Text").length;
  const videoCount = entries.filter((e) => e.type === "Video").length;
  const data = [
    { name: "Call", value: callCount },
    { name: "Text", value: textCount },
    { name: "Video", value: videoCount },
  ].filter((d) => d.value > 0);
  const hasData = data.length > 0;
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Friendship Analytics</h1>
        <p className="text-gray-500 text-sm mb-6">Insights into your interaction patterns</p>
        {/* Pie Chart Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">By Interaction Type</h2>
          <p className="text-xs text-gray-400 mb-6">Distribution of your logged interactions</p>
          {!hasData ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="text-5xl">📊</div>
              <h3 className="text-gray-700 font-semibold">No data yet</h3>
              <p className="text-gray-400 text-sm text-center max-w-xs">
                Start logging interactions (Call, Text, Video) from a friend's profile page to see analytics here.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name] || "#999"} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} interactions`, name]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                />
                <Legend
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ color: "#374151", fontSize: "13px" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
