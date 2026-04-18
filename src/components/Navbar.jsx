import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-[#1a5c38] text-white"
        : "text-gray-600 hover:text-[#1a5c38] hover:bg-green-50"
    }`;

  return (
    <div className="navbar bg-white shadow-sm px-4 md:px-10 sticky top-0 z-50 border-b border-gray-100 min-h-14">
      <div className="navbar-start">
        <NavLink to="/" className="flex items-center gap-2">
          {/* Logo text fallback — user can swap with their logo.png */}
          <span className="text-[#1a5c38] font-black text-xl tracking-tight">KeenKeeper</span>
        </NavLink>
      </div>
      <div className="navbar-end gap-1 md:gap-2">
        <NavLink to="/" end className={linkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </NavLink>

        <NavLink to="/timeline" className={linkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Timeline</span>
        </NavLink>

        <NavLink to="/stats" className={linkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Stats</span>
        </NavLink>
      </div>
    </div>
  );
}
