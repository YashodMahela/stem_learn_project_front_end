import { Link } from "react-router";
import { Linkedin } from "lucide-react"; // modern icons library

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black py-8 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-6 text-center md:text-left">
        {/* Left: Copyright */}
        <p className="text-rose-500 font-bold text-lg tracking-tight">
          © 2025 <span className="text-rose-600 font-extrabold">Yashod Jayathilaka</span> | Building cool things for the web 🚀
        </p>


        {/* Middle: Navigation Links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link
            to="/contact"
            className="hover:text-rose-400 transition-colors duration-300"
          >
            Contact Us
          </Link>
          <a
            href="mailto:yashjayathilaka12@gmail.com"
            className="hover:text-rose-400 transition-colors duration-300"
          >
            yashjayathilaka12@gmail.com
          </a>
        </div>

        {/* Right: Social Links */}
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/yashodjayathilaka"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-rose-400 transition-colors duration-300"
          >
            <Linkedin size={18} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Small Bottom Line */}
      <div className="mt-6 border-t border-gray-800 pt-4 text-xs text-gray-500 text-center">
        Designed with ❤️ for a better web experience.
      </div>
    </footer>
  );
}

export default Footer;
