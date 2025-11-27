import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PasswordModal({ open, onClose, onSubmit }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await onSubmit(password);
      setPassword("");
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-black/70 rounded-xl p-6 w-80 relative z-50 border-b-2 border-[#f04e23] backdrop-blur-sm"
      >
 
        <h2 className="text-xl font-bold text-white mb-4">Confirm Password</h2>
        <p className="text-gray-300 mb-4 text-sm">
          Enter your current password to update your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Current Password"
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#f04e23] hover:bg-[#d13d18] rounded-lg text-white font-semibold"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
          >
            Cancel
          </button>
        </form>
      </motion.div>
    </div>
  );
}
