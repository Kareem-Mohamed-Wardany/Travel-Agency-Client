import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-6">
        {/* Branding */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Travel Agency</h2>
          <p className="text-gray-400 mt-2">
            Explore the world with the best travel experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <Link
            href="about"
            className="text-gray-400 hover:text-white transition"
          >
            About Us
          </Link>
          <Link
            href="/location"
            className="text-gray-400 hover:text-white transition"
          >
            Location
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Travel Agency. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
