import { useNavigate } from "react-router-dom";

const statusConfig = {
  "on-track": { label: "on-track", className: "bg-green-500 text-white" },
  "almost due": { label: "almost due", className: "bg-[#efad44] text-white" },
  overdue: { label: "overdue", className: "bg-red-500 text-white" },
};

const tagColors = [
  "bg-yellow-400 text-yellow-900",
  "bg-blue-100 text-blue-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
  "bg-pink-100 text-pink-800",
];

export default function FriendCard({ friend }) {
  const navigate = useNavigate();
  const status = statusConfig[friend.status] || statusConfig.active;

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      onClick={() => navigate(`/friend/${friend.id}`)}
    >
      {/* Photo */}
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
        <img
          src={friend.photo}
          alt={friend.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1a5c38&color=fff`;
          }}
        />
      </div>

      {/* Name */}
      <h3 className="font-semibold text-gray-800 text-sm text-center leading-tight">{friend.name}</h3>

      {/* Days since contact */}
      <p className="text-gray-400 text-xs">{friend.daysSinceContact}d ago</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 justify-center">
        {friend.tags && friend.tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[i % tagColors.length]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status */}
      <span className={`text-xs px-3 py-0.5 rounded-full font-bold ${status.className}`}>
        {status.label}
      </span>
    </div>
  );
}
