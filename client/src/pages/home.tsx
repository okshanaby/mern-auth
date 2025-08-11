import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <div className="text-center flex flex-col items-center justify-center">
        {/* Logo / Title */}
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          <span className="text-indigo-500">UZNEI</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center max-w-md">
          Secure authentication with email OTP verification and password reset —
          built on the MERN stack.
        </p>

        {/* CTA Buttons */}
        <div className="flex space-x-4">
          <Button
            asChild
            className="bg-indigo-500 hover:bg-indigo-600 font-semibold transition"
          >
            <Link
              to="/signup"
              className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>
          </Button>
          <Button
            asChild
            className="border border-gray-400 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} UZNEI. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default HomePage;
