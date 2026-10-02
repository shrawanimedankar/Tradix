import { Link } from "react-router-dom";

const footerLinks = [
  { name: "About", path: "/about" },
  { name: "Products", path: "/product" },
  { name: "Pricing", path: "/pricing" },
  { name: "Support", path: "/support" },
];

function Footer() {
  return (
    <footer className="bg-[#0f001e]">
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Copyright */}
          <div>
            <Link to="/">
              <img
                src="/media/images/logoName.png"
                className="w-35"
                alt="Tradix logo"
              />
            </Link>

            <p className="text-sm text-gray-300">
              &copy; 2026
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 font-semibold text-white">Company</p>

            <div className="flex flex-row gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-300 no-underline hover:text-[#16A34A]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 text-xs leading-relaxed text-gray-300">
          <p>
            Tradix is a personal project created for educational and
            demonstration purposes. It is not a registered stockbroker,
            investment adviser, or financial institution. No real investments,
            trades, or financial transactions are processed through this
            website.
          </p>

          <p>
            Investing and trading in financial markets involves risk. The
            information presented on this website is for educational purposes
            only and should not be considered financial, investment, or trading
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
