import { NavLink } from "react-router-dom";
import { FiHome, FiClock, FiBarChart2 } from "react-icons/fi";
export default function Navbar() {
    const navItems = [
        { to: "/", label: "Home", Icon: FiHome },
        { to: "/timeline", label: "Timeline", Icon: FiClock },
        { to: "/stats", label: "Stats", Icon: FiBarChart2 },
    ];
    return (
        <nav className="navbar bg-white shadow-sm px-4 md:px-8 sticky top-0 z-50 min-h-14">
            <div className="flex-1">
                <NavLink to="/" className="text-xl font-bold text-gray-800 tracking-tight">
                    KeenKeeper
                </NavLink>
            </div>
            <div className="flex-none">
                <ul className="flex items-center gap-1">
                    {navItems.map(({ to, label, Icon }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={to === "/"}
                                className={({ isActive }) =>
                                    `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${isActive
                                        ? "bg-[#1a5c38] text-white"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`
                                }
                            >
                                <Icon size={15} />
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}