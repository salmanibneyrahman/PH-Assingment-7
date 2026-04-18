import { FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";
export default function Footer() {
    return (
        <footer className="bg-[#1a5c38] text-white pt-10 pb-6 mt-auto">
            <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center gap-4">
                <h2 className="text-3xl font-bold tracking-tight">KeenKeeper</h2>
                <p className="text-sm text-green-200 max-w-md">
                    Your personal shelf of meaningful connections. Browse, text, and nurture the relationships that matter most.
                </p>
                <div className="mt-2">
                    <p className="text-xs text-green-300 uppercase tracking-widest mb-3 font-semibold">
                        Social Links
                    </p>
                    <div className="flex items-center gap-3 justify-center">
                        <a
                            href="#"
                            className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#1a5c38] transition-colors"
                            aria-label="Twitter"
                        >
                            <FiTwitter size={14} />
                        </a>
                        <a
                            href="#"
                            className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#1a5c38] transition-colors"
                            aria-label="Facebook"
                        >
                            <FiFacebook size={14} />
                        </a>
                        <a
                            href="#"
                            className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#1a5c38] transition-colors"
                            aria-label="Instagram"
                        >
                            <FiInstagram size={14} />
                        </a>
                    </div>
                </div>
                <div className="divider divider-success opacity-30 my-1 w-full"></div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3">
                    <p className="text-xs text-green-300">
                        &copy; 2025 KeenKeeper. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-green-300">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}