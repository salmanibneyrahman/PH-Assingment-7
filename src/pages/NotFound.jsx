import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-black text-[#1a5c38] mb-4">404</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn bg-[#1a5c38] hover:bg-[#154d2e] text-white border-none rounded-full px-8"
      >
        Go Back Home
      </button>
    </div>
  );
}
