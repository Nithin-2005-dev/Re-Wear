import { Link } from "react-router-dom";

const QuoteRedirect = () => {
  return (
    <div className="text-center py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-5xl font-bold text-white leading-snug max-w-4xl mx-auto">
        “Empower sustainable choices — explore what others are looking for and help make fashion circular.”
      </h2>
      <div className="mt-8">
        <Link
          to="/requests"
          className="inline-block bg-green-500 text-black text-lg md:text-xl font-semibold px-6 py-3 rounded-full hover:bg-green-400 transition"
        >
          Browse Swap Requests
        </Link>
      </div>
    </div>
  );
};

export default QuoteRedirect;
