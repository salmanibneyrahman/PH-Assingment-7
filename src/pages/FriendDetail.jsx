import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTimeline } from "../context/TimelineContext";

const statusConfig = {
  now: { label: "NOW", badgeClass: "badge-success text-white" },
  active: { label: "ACTIVE", badgeClass: "badge-info text-white" },
  overdue: { label: "OVERDUE", badgeClass: "badge-error text-white" },
};

const tagColors = [
  "bg-yellow-400 text-yellow-900",
  "bg-blue-100 text-blue-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
];

function CallIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

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

  const getNextDueDate = () => {
    if (!friend) return "—";
    const now = new Date();
    const daysLeft = friend.goal - friend.daysSinceContact;
    if (daysLeft <= 0) return "Overdue";
    const due = new Date(now.getTime() + daysLeft * 24 * 60 * 60 * 1000);
    return due.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const handleCheckin = (type) => {
    if (!friend) return;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const entry = {
      id: Date.now(),
      type,
      title: `${type} with ${friend.name}`,
      date: formattedDate,
      friendId: friend.id,
    };
    addEntry(entry);
    toast.success(`${type} with ${friend.name} logged!`, {
      icon: type === "Call" ? "📞" : type === "Text" ? "💬" : "🎥",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="loading loading-spinner loading-lg text-[#1a5c38]"></span>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-gray-500 text-lg">Friend not found.</p>
        <button className="btn bg-[#1a5c38] text-white" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const status = statusConfig[friend.status] || statusConfig.active;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1a5c38] mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ===== LEFT COLUMN ===== */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {/* Friend Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center gap-3">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                <img
                  src={friend.photo}
                  alt={friend.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1a5c38&color=fff&size=96`;
                  }}
                />
              </div>

              <h2 className="text-xl font-bold text-gray-800 text-center">{friend.name}</h2>

              <span className={`badge ${status.badgeClass} font-bold px-3`}>{status.label}</span>

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

              {/* Bio */}
              {friend.bio && (
                <p className="text-gray-500 text-xs text-center leading-relaxed italic">
                  "{friend.bio}"
                </p>
              )}

              {/* Email */}
              {friend.email && (
                <p className="text-xs text-gray-400">{friend.email}</p>
              )}

              <div className="divider my-0 w-full"></div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 w-full">
                <button className="btn btn-sm btn-outline border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Snooze 2 Weeks
                </button>
                <button className="btn btn-sm btn-outline border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Archive
                </button>
                <button className="btn btn-sm btn-outline border-red-200 text-red-500 hover:bg-red-50 rounded-full w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* ① Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-800">{friend.daysSinceContact}</span>
                <span className="text-xs text-gray-500 text-center mt-1">Days Since Contact</span>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-800">{friend.goal}</span>
                <span className="text-xs text-gray-500 text-center mt-1">Goal (days)</span>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center">
                <span className="text-base font-bold text-gray-800 text-center leading-tight">{getNextDueDate()}</span>
                <span className="text-xs text-gray-500 text-center mt-1">Next Due Date</span>
              </div>
            </div>

            {/* ② Relationship Goal Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Relationship Goal</h3>
                <button className="btn btn-xs btn-outline border-gray-200 text-gray-500 rounded-full hover:bg-gray-50">
                  Edit
                </button>
              </div>
              <p className="text-gray-500 text-sm">
                {friend.bio ? friend.bio.split(".")[0] + "." : "Stay connected regularly."}
              </p>
              <p className="text-gray-700 text-sm font-medium mt-1">
                Connect every:{" "}
                <span className="text-[#1a5c38] font-bold">{friend.goal} days</span>
              </p>
            </div>

            {/* ③ Quick Check-In Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Check-In</h3>
              <div className="flex gap-4 justify-around">
                {/* Call */}
                <button
                  onClick={() => handleCheckin("Call")}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-green-50 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <CallIcon />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Call</span>
                </button>

                {/* Text */}
                <button
                  onClick={() => handleCheckin("Text")}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-blue-50 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <TextIcon />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Text</span>
                </button>

                {/* Video */}
                <button
                  onClick={() => handleCheckin("Video")}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-purple-50 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <VideoIcon />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
