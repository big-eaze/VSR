import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, Camera, PenLine, LogOut, Sparkles, ArrowRight, SunMoon } from "lucide-react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { MenuContext } from "../utils/MenuContext";
import { handleEmailUpdate, handleUpdateUsername } from "../utils/AuthHandler";
import { saveAvatar, getAvatar } from "../utils/userAvatar";
import FeedbackSection from "../components/FeedbackSection";
import PasswordModal from "../components/PasswordModal";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";


function Profile() {
  const { userPrivate, setUserPrivate } = React.useContext(MenuContext);
  const [openModal, setOpenModal] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [verificationModal, setVerificationModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [pendingEmailUpdate, setPendingEmailUpdate] = useState(null);

  const [editUserData, setEditUserData] = useState({
    username: userPrivate?.username || "",
    email: userPrivate?.email || "",
  })





  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // user is authenticated
        setEditUserData({
          username: user.displayName || "",
          email: user.email || "",
        });
      } else {
        setCurrentUser(null);
        setMessage("No authenticated user found. Please log in again.");
      }
    });

    console.log(editUserData);;
    return () => unsubscribe();
  }, []);


  function handleFormValidation() {
    if (!editUserData.username.trim()) {
      alert("Username cannot be empty.");
      return false;
    }
    if (!editUserData.email.trim() || !/\S+@\S+\.\S+/.test(editUserData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (editUserData.username === userPrivate.username && editUserData.email === userPrivate.email) {
      alert("No changes detected.");
      return false;
    }
    if (editUserData.email !== userPrivate.email) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(editUserData.email)) {
        alert("Please enter a valid email address.");
        return false;
      }
    }
    return true;
  }



  const userAvatar = getAvatar(userPrivate?.uid);


  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-100">
      <Header />

      <section className="relative min-h-[75vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1F1009] via-[#2C150C] to-[#f04e23]/20 pt-28 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex items-center justify-center w-full h-full"
        >
          <div className="relative w-[80%] md:w-[60%] xl:w-[40%] p-5 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(240,78,35,0.15)] flex flex-col items-center">

            {/* Avatar */}
            <div className="absolute -top-14 md:-top-16 left-1/2 -translate-x-1/2 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#f04e23] shadow-[0_0_40px_rgba(240,78,35,0.45)] group">
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
                        saveAvatar(userPrivate.uid, reader.result);
                        window.location.reload();
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* User Info */}
            <div className="mt-20 md:mt-24 text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
                {userPrivate?.username || "John Doe"}
              </h1>
              <p className="text-gray-400 mt-1">
                {userPrivate?.email || "user@example.com"}
              </p>
            </div>

            {/* Button */}
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
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!handleFormValidation()) return;
              // If email changed, trigger password modal
              if (editUserData.email !== userPrivate.email) {
                setPendingEmailUpdate(editUserData);
                setPasswordModalOpen(true);
              } else {
                handleUpdateUsername(editUserData.username, setUserPrivate, null,);
              }
            }}
          >

            <input
              type="text"
              name="username"
              value={editUserData.username || ""}
              placeholder="Username"
              onChange={(e) => {
                setEditUserData({ ...editUserData, username: e.target.value });
              }}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={editUserData?.email || ""}
              placeholder="Email"
              onChange={(e) => {
                setEditUserData({ ...editUserData, email: e.target.value });
              }}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!currentUser}
              className={`w-full bg-[#f04e23] py-2 rounded-lg ${!currentUser ? "opacity-50 cursor-not-allowed" : "hover:bg-[#d13d18]"
                }`}
            >
              Save Changes
            </button>

            <p className="text-sm mt-4 text-[#f04e23] tracking-wide">{message}</p>
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
      <Modal
        open={verificationModal}
        onClose={() => setVerificationModal(false)}
        title="Verify Your New Email"
      >
        <div className="text-center space-y-4 py-2">
          <p className="text-gray-300">
            A verification link has been sent to your new email address.
          </p>
          <p className="text-gray-400 text-sm">
            Please click the link in the email to confirm and complete the update.
          </p>

          <button
            onClick={() => setVerificationModal(false)}
            className="w-full bg-[#f04e23] py-2 rounded-lg hover:bg-[#d13d18]"
          >
            Okay, I Understand
          </button>
        </div>
      </Modal>

      <PasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSubmit={async (password) => {
          try {
            await handleEmailUpdate({
              username: pendingEmailUpdate.username,
              email: pendingEmailUpdate.email,
              password,
              setUserPrivate
            });
            setPasswordModalOpen(false);
            setVerificationModal(true); // show modal that email verification sent
          } catch (err) {
            alert(err.message); // show error
          }
        }}
      />

    </div>
  );
}

export default Profile;
