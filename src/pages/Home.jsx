import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FriendCard from "../components/FriendCard";

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
        .catch(() => {
          setLoading(false);
        });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === "now" || f.status === "active").length;
  const needAttention = friends.filter((f) => f.status === "overdue").length;
  // Simulate interactions this month
  const interactionsThisMonth = 12;

  const handleAddFriend = () => {
    toast.info("Add a Friend feature coming soon!", { icon: "👥" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="bg-white py-10 px-4 text-center border-b border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto mb-5">
          Your personal shelf of meaningful connections. Browse, lend, and nurture the relationships that matter most.
        </p>
        <button
          onClick={handleAddFriend}
          className="btn bg-[#1a5c38] hover:bg-[#154d2e] text-white border-none rounded-md px-5 py-2 flex items-center gap-2 mx-auto text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add a Friend
        </button>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-800">{totalFriends}</span>
            <span className="text-xs text-gray-500 mt-1">Total Friends</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-800">{onTrack}</span>
            <span className="text-xs text-gray-500 mt-1">On Track</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-800">{needAttention}</span>
            <span className="text-xs text-gray-500 mt-1">Need Attention</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-800">{interactionsThisMonth}</span>
            <span className="text-xs text-gray-500 mt-1">Interactions This Month</span>
          </div>
        </div>
      </div>

      {/* Friends Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-5">Your Friends</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="loading loading-spinner loading-lg text-[#1a5c38]"></span>
            <p className="text-gray-500 text-sm">Loading your friends...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
