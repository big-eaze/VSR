import { useContext, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { MenuContext } from "../utils/MenuContext";

export default function AuthModal() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");


  const { setAuthOpen } = useContext(MenuContext);


  function handleAuth(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Fake backend delay
    setTimeout(() => {
      setLoading(false);
      setMessage(
        isSignUp
          ? "Account created successfully!"
          : "Signed in successfully!"
      );
    }, 1500);
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-black rounded-2xl shadow-2xl border border-white/10 p-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setAuthOpen(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white tracking-wide mb-6">
          {isSignUp ? "Join VS!A" : "Welcome Back"}
        </h2>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-5">
          {isSignUp ? (
            <>
              {/* Username for Sign Up */}
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f04e23]"
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f04e23]"
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f04e23]"
              />
              <input
                type="confirm password"
                placeholder="confirm Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f04e23]"
              />
            </>
          ) : (
            <>
              {/* Username or Email for Sign In */}
              <input
                type="text"
                placeholder="Username or Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f04e23]"
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f04e23]"
              />
              <div className="flex items-center text-sm text-white ">
                <input type="checkbox" className=" accent-[#A0552D] w-4 h-4 mr-2" />
                <p>Remember me </p>
              </div>
            </>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-gray-900 to-[#A0552D] hover:from-[#A0552D] hover:to-gray-900 transition text-white font-semibold disabled:opacity-50"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
          </button>
        </form>

        {/* Feedback */}
        {message && (
          <p className="mt-4 text-center text-sm text-[#f04e23]">{message}</p>
        )}

        {/* Toggle */}
        <p className="mt-6 text-center text-gray-400">
          {isSignUp ? "Already a member?" : "New to VS!A?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#f04e23] hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
