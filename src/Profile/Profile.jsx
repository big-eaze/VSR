import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, Camera, PenLine, LogOut, Sparkles, ArrowRight, SunMoon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { MenuContext } from "../utils/MenuContext";
import { saveAvatar, getAvatar } from "../utils/userAvatar";
import FeedbackSection from "../components/FeedbackSection";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [openModal, setOpenModal] = useState(false);
  const [activeSection, setActiveSection] = useState("");



  const userAvatar = getAvatar(user?.uid);

  useEffect(() => {
    console.log("User data:", user);
  }, [])

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-100">
      <Header />

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1F1009] via-[#2C150C] to-[#f04e23]/20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center mt-24 md:mt-14 w-full h-full"
        >
          <div className="relative w-[90%] md:w-[60%] xl:w-[40%] p-5 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(240,78,35,0.15)]">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full overflow-hidden border-4 border-[#f04e23] shadow-[0_0_40px_rgba(240,78,35,0.45)] group">
              <img
                src={userAvatar || "/avatar.png"}
                alt="User Avatar"
                className="w-full h-full object-cover object-top transition-all group-hover:opacity-70"
              />
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                <Camera className="w-6 h-6 text-white mb-1" />
                <span className="text-sm">Change</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        saveAvatar(user.uid, reader.result);
                        window.location.reload();
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            <div className="mt-20 text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
                {user?.username || "John Doe"}
              </h1>
              <p className="text-gray-400 mt-1">
                {user?.email || "user@example.com"}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-8 px-6 py-3 w-full bg-[#f04e23] text-white font-semibold rounded-xl shadow-lg hover:bg-[#d13d18] transition"
              onClick={() => {
                setActiveSection("Edit Personal Info");
                setOpenModal(true);
              }}
            >
              Edit Profile
            </motion.button>
          </div>
        </motion.div>
      </section>



      <section className="py-20 bg-gradient-to-b from-[#120907] via-[#1A0D08] to-[#2C150C]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-12"
          >
            Your <span className="text-[#f04e23]">Style Insights</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Uploaded Wears", value: 42 },
              { label: "Favorite Outfits", value: 15 },
              { label: "AI Recommendations", value: 128 },
              { label: "Style Matches", value: 56 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-xl flex flex-col rounded-2xl p-6 border border-white/10 hover:bg-white/20 shadow-lg"
              >
                <h3 className="text-4xl font-bold  text-[#f04e23] mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-300 text-sm overflow-hidden text-ellipsis">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-24 bg-gradient-to-br from-[#2C150C] via-[#3B1E12] to-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Manage Your <span className="text-[#f04e23]">Profile</span>
          </motion.h2>

          <div className="space-y-6">
            {[
              { icon: <PenLine />, label: "Edit Personal Info" },
              { icon: <Settings />, label: "Account Settings" },
              { icon: <Sparkles />, label: "Feedback / Contact Support" },
              { icon: <LogOut />, label: "Log Out" },
            ].map((item, i) => (
              <motion.div
                key={i}
                onClick={() => {
                  setActiveSection(item.label);
                  setOpenModal(true);
                }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-md cursor-pointer hover:bg-white/20 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-[#f04e23]/20 p-3 rounded-full text-[#f04e23]">
                    {item.icon}
                  </div>
                  <span className="text-lg font-medium">{item.label}</span>
                </div>
                <ArrowRight className="text-gray-400 w-5 h-5" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={activeSection}
      >
        {activeSection === "Edit Personal Info" && (
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none"
            />
            <button className="w-full bg-[#f04e23] py-2 rounded-lg hover:bg-[#d13d18]">
              Save Changes
            </button>
          </form>
        )}

        {activeSection === "Account Settings" && (
          <div className="space-y-4">
            <p>Change your password or manage security options here.</p>
            <button className="bg-[#f04e23] py-2 px-4 rounded-lg hover:bg-[#d13d18]">
              Change Password
            </button>
          </div>
        )}

        {activeSection === "Feedback / Contact Support" && (
          <FeedbackSection />
        )}

        {activeSection === "Log Out" && (
          <div className="text-center space-y-4">
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/signin";
                }}
                className="bg-[#f04e23] px-4 py-2 rounded-lg hover:bg-[#d13d18]"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Profile;
