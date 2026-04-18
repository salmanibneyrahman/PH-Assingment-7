import { useState, useEffect } from "react";
import { FiUserPlus, FiUsers, FiCheckCircle, FiAlertTriangle, FiActivity } from "react-icons/fi";
import FriendCard from "../components/FriendCard";
import { toast } from "react-toastify";
export default function Home() {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            fetch("/friends.json")
                .then((res) => res.json())
                .then((data) => {
                    setFriends(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }, 800);
        return () => clearTimeout(timer);
    }, []);
    const totalFriends = friends.length;
    const onTrack = friends.filter((f) => f.status === "on-track").length;
    const needAttention = friends.filter((f) => f.status === "needs-attention").length;
    const interactionsThisMonth = 12;
    const summaryCards = [
        { label: "Total Friends", value: totalFriends, Icon: FiUsers, iconColor: "text-blue-500", bg: "bg-blue-50" },
        { label: "On Track", value: onTrack, Icon: FiCheckCircle, iconColor: "text-green-500", bg: "bg-green-50" },
        { label: "Need Attention", value: needAttention, Icon: FiAlertTriangle, iconColor: "text-yellow-500", bg: "bg-yellow-50" },
        { label: "Interactions This Month", value: interactionsThisMonth, Icon: FiActivity, iconColor: "text-purple-500", bg: "bg-purple-50" },
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <section className="bg-white border-b border-gray-100 py-12 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Friends to keep close in your life
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base mb-6 max-w-lg mx-auto">
                        Your personal shelf of meaningful connections. Browse, track, and nurture the relationships that matter most.
                    </p>
                    <button
                        className="btn btn-sm text-white border-none flex items-center gap-2 mx-auto px-5 py-2"
                        style={{ backgroundColor: "#1a5c38" }}
                        onClick={() => toast.info("Add friend feature coming soon!")}
                    >
                        <FiUserPlus size={16} />
                        Add a Friend
                    </button>
                </div>
                {/* Summary Cards */}
                <div className="max-w-3xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {summaryCards.map(({ label, value, Icon, iconColor, bg }) => (
                        <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center">
                            <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center mb-2`}>
                                <Icon size={18} className={iconColor} />
                            </div>
                            <span className="text-2xl font-bold text-gray-800">{value}</span>
                            <span className="text-xs text-gray-500 mt-0.5">{label}</span>
                        </div>
                    ))}
                </div>
            </section>
            {/* Friends Grid */}
            <section className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-lg font-bold text-gray-800 mb-5">Your Friends</h2>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <span className="loading loading-spinner loading-lg text-[#1a5c38]"></span>
                        <p className="text-gray-500 text-sm">Loading friends...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {friends.map((friend) => (
                            <FriendCard key={friend.id} friend={friend} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}