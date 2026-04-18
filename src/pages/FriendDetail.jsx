import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTimeline } from "../context/TimelineContext";
import {
    FiPhone,
    FiMessageSquare,
    FiVideo,
    FiClock,
    FiArchive,
    FiTrash2,
    FiEdit,
    FiArrowLeft,
    FiCalendar,
    FiTarget,
    FiMail,
    FiTag,
} from "react-icons/fi";
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
];
export default function FriendDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addEntry } = useTimeline();
    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("/friends.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((f) => f.id === parseInt(id));
                setFriend(found || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);
    const handleCheckIn = (type) => {
        addEntry(type, friend.name);
        const labels = { call: "Call", text: "Text", video: "Video" };
        toast.success(`${labels[type]} with ${friend.name} logged to Timeline!`);
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-[#1a5c38]"></span>
            </div>
        );
    }
    if (!friend) {
        navigate("/404");
        return null;
    }
    const status = statusConfig[friend.status] || statusConfig["on-track"];
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + (friend.goal - friend.daysSinceContact));
    const formattedDueDate = nextDueDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors"
                >
                    <FiArrowLeft size={16} />
                    Back to Friends
                </button>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                    {/* Left Column */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center">
                            <div className="relative mb-3">
                                <img
                                    src={friend.photo}
                                    alt={friend.name}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=random`;
                                    }}
                                />
                                <span
                                    className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${status.dot}`}
                                ></span>
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">{friend.name}</h2>
                            <span
                                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold mt-1 mb-3 ${status.bg} ${status.text}`}
                            >
                                {status.label}
                            </span>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                                {friend.tags.map((tag, i) => (
                                    <span
                                        key={tag}
                                        className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${tagColors[i % tagColors.length]}`}
                                    >
                                        <FiTag size={10} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {/* Bio */}
                            <p className="text-xs text-gray-500 mb-3 leading-relaxed">{friend.bio}</p>
                            {/* Email */}
                            <a
                                href={`mailto:${friend.email}`}
                                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1a5c38] transition-colors mb-4"
                            >
                                <FiMail size={13} />
                                {friend.email}
                            </a>
                            <div className="divider my-1 w-full"></div>
                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 w-full mt-1">
                                <button className="btn btn-sm btn-ghost text-yellow-600 border border-yellow-200 hover:bg-yellow-50 w-full gap-2 text-xs">
                                    <FiClock size={14} />
                                    Snooze 2 Weeks
                                </button>
                                <button className="btn btn-sm btn-ghost text-gray-600 border border-gray-200 hover:bg-gray-50 w-full gap-2 text-xs">
                                    <FiArchive size={14} />
                                    Archive
                                </button>
                                <button className="btn btn-sm btn-ghost text-red-500 border border-red-200 hover:bg-red-50 w-full gap-2 text-xs">
                                    <FiTrash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center">
                                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                                    <FiCalendar size={16} className="text-blue-500" />
                                </div>
                                <span className="text-2xl font-bold text-gray-800">{friend.daysSinceContact}</span>
                                <span className="text-xs text-gray-500 mt-0.5">Days Since Contact</span>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center">
                                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center mb-2">
                                    <FiTarget size={16} className="text-green-500" />
                                </div>
                                <span className="text-2xl font-bold text-gray-800">{friend.goal}</span>
                                <span className="text-xs text-gray-500 mt-0.5">Goal (days)</span>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center">
                                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                                    <FiCalendar size={16} className="text-purple-500" />
                                </div>
                                <p className="text-sm font-bold text-gray-800">{formattedDueDate}</p>
                                <span className="text-xs text-gray-500 mt-0.5">Next Due Date</span>
                            </div>
                        </div>
                        {/* Relationship Goal Card */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-800 text-sm">Relationship Goal</h3>
                                <button className="btn btn-xs btn-ghost text-gray-500 gap-1">
                                    <FiEdit size={12} />
                                    Edit
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">
                                {friend.bio}
                            </p>
                            <p className="text-sm text-gray-700">
                                Connect every{" "}
                                <span className="font-semibold text-[#1a5c38]">{friend.goal} days</span>
                            </p>
                        </div>
                        {/* Quick Check-In Card */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            <h3 className="font-semibold text-gray-800 text-sm mb-4">Quick Check-In</h3>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={() => handleCheckIn("call")}
                                    className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all duration-150 cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <FiPhone size={18} className="text-green-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">Call</span>
                                </button>
                                <button
                                    onClick={() => handleCheckIn("text")}
                                    className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-150 cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <FiMessageSquare size={18} className="text-blue-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">Text</span>
                                </button>
                                <button
                                    onClick={() => handleCheckIn("video")}
                                    className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all duration-150 cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <FiVideo size={18} className="text-purple-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">Video</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
