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
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Friendship Analytics</h1>
          <p className="text-gray-500 text-sm">Insights into your interaction patterns</p>
        </header>

        {/* Pie Chart Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700">By Interaction Type</h2>
            <p className="text-xs text-gray-400">Distribution of your logged interactions</p>
          </div>

          {!hasData ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3">
              <div className="text-5xl">📊</div>
              <h3 className="text-gray-700 font-semibold">No data yet</h3>
              <p className="text-gray-400 text-sm text-center max-w-[250px]">
                Log a Call, Text, or Video from a friend's profile to see your stats.
              </p>
            </div>
          ) : (
            <>
              {/* Chart Container */}
              <div className="h-[300px] sm:h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {data.map((entry) => (
                        <Cell key={entry.name} fill={COLORS[entry.name]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} interactions`]}
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      iconType="circle"
                      wrapperStyle={{ paddingTop: "20px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Mobile-Friendly Breakdown List */}
              <div className="mt-8 grid grid-cols-3 gap-2 border-t border-gray-50 pt-6">
                {Object.keys(COLORS).map((type) => {
                  const count = entries.filter(e => e.type === type).length;
                  return (
                    <div key={type} className="flex flex-col items-center p-2 rounded-xl bg-gray-50">
                      <span className="text-xs text-gray-500 mb-1">{type}s</span>
                      <span className="text-lg font-bold" style={{ color: COLORS[type] }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
