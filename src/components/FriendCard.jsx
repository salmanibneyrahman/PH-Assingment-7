import { useNavigate } from "react-router-dom";
const statusConfig = {
    "on-track": { label: "On Track", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
    "needs-attention": { label: "Needs Attention", bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
    "at-risk": { label: "At Risk", bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500" },
};
const tagColors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-orange-100 text-orange-700",
    "bg-pink-100 text-pink-700",
    "bg-teal-100 text-teal-700",
];
export default function FriendCard({ friend }) {
    const navigate = useNavigate();
    const status = statusConfig[friend.status] || statusConfig["on-track"];
    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            onClick={() => navigate(`/friend/${friend.id}`)}
        >
            <div className="relative mb-3">
                <img
                    src={friend.photo}
                    alt={friend.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=random`;
                    }}
                />
                <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${status.dot}`}
                ></span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">{friend.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5 mb-2">
                {friend.daysSinceContact}d ago
            </p>
            <div className="flex flex-wrap gap-1 justify-center mb-2">
                {friend.tags.slice(0, 3).map((tag, i) => (
                    <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[i % tagColors.length]}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${status.bg} ${status.text}`}
            >
                {status.label}
            </span>
        </div>
    );
}