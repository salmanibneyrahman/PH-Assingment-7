export default function Footer() {
  return (
    <footer className="bg-[#1a5c38] text-white pt-10 pb-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4">
        {/* Brand name */}
        <h2 className="text-3xl font-black text-white tracking-tight">KeenKeeper</h2>

        {/* Tagline */}
        <p className="text-green-200 text-sm max-w-md leading-relaxed">
          Your personal shelf of meaningful connections. Browse, lend, and nurture the
          relationships that matter most.
        </p>

        {/* Social Links heading */}
        <p className="text-white font-semibold mt-2 text-sm">Social Links</p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {/* Facebook */}
          <a
            href="#"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full border border-green-400 flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          {/* Twitter/X */}
          <a
            href="#"
            aria-label="Twitter"
            className="w-9 h-9 rounded-full border border-green-400 flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full border border-green-400 flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4 stroke-white fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* Divider + bottom links */}
        <div className="w-full border-t border-green-700 mt-4 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-green-300">
          <span>© 2025 KeenKeeper. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
