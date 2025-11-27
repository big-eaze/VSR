import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MailCheck, RefreshCcw, ShieldCheck } from "lucide-react";
import { resendVerificationEmail } from "./utils/AuthHandler";
import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function VerifyEmail() {
  const [userEmail, setUserEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  async function handleCheckVerification() {
    setChecking(true);
    setMessage("");

    await auth.currentUser.reload(); // Refresh user state from Firebase
    const refreshedUser = auth.currentUser;

    if (refreshedUser.emailVerified) {
      setMessage("Email verified! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      setMessage("Email is not verified yet. Please check your inbox.");
    }

    setChecking(false);
  }

  async function handleResend() {
    setResendLoading(true);
    const result = await resendVerificationEmail();
    setResendLoading(false);

    if (result.success) {
      setMessage("A new verification email has been sent!");
    } else {
      setMessage(result.error || "Could not resend verification email.");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-[#A0552D] to-[#2C150C] text-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-3xl max-w-md w-full text-center shadow-[0_0_60px_rgba(240,78,35,0.15)]"
      >
        <div className="flex justify-center mb-6">
          <MailCheck className="w-16 h-16 text-[#f04e23]" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>

        <p className="text-gray-300 mb-6">
          A verification link has been sent to:
          <br />
          <span className="text-[#f04e23] font-semibold">{userEmail}</span>
        </p>

        <p className="text-gray-400 text-sm mb-8">
          Please check your inbox or spam folder and click the verification link.
        </p>

        {/* Check Button */}
        <button
          onClick={handleCheckVerification}
          disabled={checking}
          className="w-full py-3 bg-[#f04e23] hover:bg-[#d13d18] rounded-xl text-white font-medium mb-4 transition flex justify-center gap-2 items-center"
        >
          <ShieldCheck className="w-5 h-5" />
          {checking ? "Checking..." : "I Have Verified My Email"}
        </button>

        {/* Resend Button */}
        <button
          onClick={handleResend}
          disabled={resendLoading}
          className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-medium transition flex justify-center gap-2 items-center"
        >
          <RefreshCcw className={`w-5 h-5 ${resendLoading ? "animate-spin" : ""}`} />
          {resendLoading ? "Resending..." : "Resend Verification Email"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-sm mt-4 text-[#f04e23] tracking-wide">{message}</p>
        )}
      </motion.div>
    </div>
  );
}
