import { useNavigate } from "react-router-dom";
import { FiHome, FiAlertTriangle } from "react-icons/fi";
export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                    <FiAlertTriangle size={36} className="text-red-500" />
                </div>
                <h1 className="text-7xl font-bold text-gray-200 mb-2">404</h1>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Page Not Found</h2>
                <p className="text-sm text-gray-500 mb-8">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="btn text-white border-none gap-2"
                    style={{ backgroundColor: "#1a5c38" }}
                >
                    <FiHome size={16} />
                    Go Back Home
                </button>
            </div>
        </div>
    );
}