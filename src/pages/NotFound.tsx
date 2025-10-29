
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <div className="text-center max-w-2xl">
        {/* Animated 404 */}
        <div className="mb-8 relative">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 text-purple-500 dark:text-purple-300 animate-bounce" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for seems to have wandered off into the digital wilderness.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-gray-300 dark:border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 text-gray-500 dark:text-gray-400 text-sm">
          Error Code: <span className="font-mono text-purple-600 dark:text-purple-400">{location.pathname}</span>
        </div>
      </div>

      {/* Floating shapes animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default NotFound;