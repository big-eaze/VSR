import { useContext, useState } from "react";
import { Loader2, Eye, EyeOff, } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { handleSignin, handleSignup } from "../utils/AuthHandler";
import { MenuContext } from "../utils/MenuContext";



export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const { setUserPrivate, setUserWardrobe } = useContext(MenuContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);





  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true)
    if (isSignUp) {
      await handleSignup(form, navigate, setUserPrivate, setUserWardrobe);

    } else {
      await handleSignin(form, navigate, setUserPrivate, setUserWardrobe);
    }
    setLoading(false);
  }


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0D0D0D] overflow-hidden text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#A0552D] to-[#3B1E12]" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-[90%] max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight text-center"
        >
          {isSignUp ? "Join the Style" : "Welcome Back"}
        </motion.h1>
        <p className="text-center text-gray-300 mb-8">
          {isSignUp
            ? "Create your account and unlock personalized fashion matches."
            : "Sign in to continue curating your next stunning outfit."}
        </p>

        <form onSubmit={onSubmit} className="space-y-5">

          {/* Username (Sign Up only) */}
          {isSignUp && (
            <input
              type="text"
              placeholder="Username"
              autoComplete="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
      placeholder-gray-400 focus:ring-2 focus:ring-[#f04e23] outline-none"
              required
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
    placeholder-gray-400 focus:ring-2 focus:ring-[#f04e23] outline-none"
            required
          />

          {/* PASSWORD with show/hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 
      placeholder-gray-400 focus:ring-2 focus:ring-[#f04e23] outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* CONFIRM PASSWORD with show/hide */}
          {isSignUp && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                autoComplete="confirm-password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 
        placeholder-gray-400 focus:ring-2 focus:ring-[#f04e23] outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          )}

          {/* Remember me */}
          {!isSignUp && (
            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#A0552D] w-4 h-4" />
                Remember me
              </label>
              <button className="text-[#f04e23] hover:underline">
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 
    rounded-xl bg-gradient-to-r from-[#f04e23] to-[#A0552D] 
    hover:scale-[1.02] transition-transform font-semibold
    ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (<Loader2 className="w-5 h-5 animate-spin" />) : isSignUp ? "Create Account" : "Sign In"}
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-[#f04e23]">{message}</p>
        )}

        <p className="mt-6 text-center text-gray-400">
          {isSignUp ? "Already have an account?" : "New to VSA?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#f04e23] hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>

      <div className="absolute top-10 left-20 w-72 h-72 bg-[#f04e23]/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-20 w-64 h-64 bg-[#A0552D]/40 blur-[100px] rounded-full"></div>
    </div>
  );
}
