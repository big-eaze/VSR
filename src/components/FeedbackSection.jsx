import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, CheckCircle, CircleSlash } from "lucide-react";


export default function FeedbackSection() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = () => {
    if (!message.trim()) {
      setStatus("error");
      return;
    }

    setTimeout(() => {
      setStatus("success");
      setMessage("");
    }, 600);
  };

  const handleReset = () => {
    setStatus("idle");
  };

  return (
    <div className="space-y-4 min-h-[200px] flex flex-col justify-center items-center text-center">
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <p className="text-gray-300 mb-2">
              We’d love to hear from you! Send us feedback or report an issue below.
            </p>
            <textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setStatus("idle");
              }}
              className="w-full h-28 p-3 rounded-xl bg-white/10 border border-white/10 focus:border-[#f04e23] focus:outline-none text-sm text-gray-200 placeholder-gray-400 resize-none"
            />

            <button
              className="w-full py-2 mt-3 bg-[#f04e23] text-white font-semibold rounded-xl shadow-lg hover:bg-[#d13d18] transition"
              onClick={handleSubmit}
            >
              Send Feedback
            </button>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="text-center px-4 sm:px-6"
          >
            <p className="text-[#f04e23] flex flex-col sm:flex-row items-center justify-center gap-2 text-base sm:text-lg font-semibold flex-wrap leading-relaxed">
              <CheckCircle className="w-6 h-6 shrink-0" />
              <span>Thank you for your feedback!</span>
            </p>

            <p className="text-gray-400 text-sm sm:text-base mt-2 px-2">
              We’ll get back to you soon.
            </p>

            <button
              onClick={handleReset}
              className="mt-4 px-4 sm:px-6 py-2 text-sm sm:text-base bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
            >
              Send Another
            </button>
          </motion.div>
        )}


        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="text-center px-4 sm:px-6"
          >
            <p className="text-red-400 flex flex-col sm:flex-row items-center justify-center gap-2 text-base sm:text-lg font-semibold flex-wrap leading-relaxed">
              <AlertCircle className="w-6 h-6 shrink-0" /> Please write a message before sending.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
            >
              Go Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
