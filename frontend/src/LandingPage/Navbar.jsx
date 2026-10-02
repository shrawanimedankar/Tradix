import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Signup", path: "/signup" },
  { name: "About", path: "/about" },
  { name: "Product", path: "/product" },
  { name: "Pricing", path: "/pricing" },
  { name: "Support", path: "/support" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-[#af68ff] via-30% to-[#8cffb6] shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
      <div className="container mx-auto px-5 py-3">
        {/* Navbar top */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={handleLinkClick}>
            <img
              src="/media/images/logoName.png"
              className="w-35"
              alt="Tradix logo"
            />
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-2xl text-black md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? "✕" : "☰"}
          </button>

          {/* Desktop menu */}
          <div className="hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg font-bold text-black no-underline hover:text-gray-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="mt-5 flex flex-col gap-4 pb-3 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className="text-lg font-semibold text-black no-underline hover:text-gray-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
