import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">ReWear</h3>
          <p className="text-sm text-gray-400">
            Reimagining fashion through sustainability. Swap, redeem, and reduce waste—one item at a time.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-400">Products</Link></li>
            <li><Link to="/requests" className="hover:text-green-400">Swap Requests</Link></li>
            <li><Link to="/add" className="hover:text-green-400">Add Item</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-400">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-green-400">Help Center</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Stay Connected</h4>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm"
            />
            <button className="bg-green-500 hover:bg-green-400 text-black px-3 py-2 rounded-md text-sm font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} ReWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
