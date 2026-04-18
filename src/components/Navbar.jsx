import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-[#1a5c38] text-white"
        : "text-gray-600 hover:text-[#1a5c38] hover:bg-green-50"
    }`;

  const NavItems = ({ showText = true }) => (
    <>
      <NavLink to="/" end className={linkClass}>
        <svg xmlns="http://w3.org" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className={showText ? "" : "hidden md:inline"}>Home</span>
      </NavLink>

      <NavLink to="/timeline" className={linkClass}>
        <svg xmlns="http://w3.org" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className={showText ? "" : "hidden md:inline"}>Timeline</span>
      </NavLink>

      <NavLink to="/stats" className={linkClass}>
        <svg xmlns="http://w3.org" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className={showText ? "" : "hidden md:inline"}>Stats</span>
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-white shadow-sm px-4 md:px-10 sticky top-0 z-50 border-b border-gray-100 min-h-14">
      <div className="navbar-start">
        {/* Hamburger: Visible on Mobile, hidden on Tablet (sm) and up */}
        <div className="dropdown sm:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost p-1 mr-2">
            <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-gray-100">
            <NavItems />
          </ul>
        </div>

        <NavLink to="/" className="flex items-center">
          <span className="font-black text-xl tracking-tight">Keen</span>
          <span className="text-[#1a5c38] font-black text-xl tracking-tight">Keeper</span>
        </NavLink>
      </div>

      {/* Horizontal Menu: Hidden on mobile, visible on Tablet (sm) and up */}
      <div className="navbar-end hidden sm:flex gap-1 md:gap-2">
        <NavItems showText={false} /> 
      </div>
    </div>
  );
}