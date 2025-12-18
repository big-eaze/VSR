import React, { useContext, useEffect, useState } from "react";
import {
  Camera,
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle2,
  ArrowLeft,
  Watch
} from "lucide-react";
import { Shirt } from "lucide-react";
import { GiTrousers } from "react-icons/gi";
import { FaShoePrints } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MenuContext } from "../utils/MenuContext";

export default function WardrobeUploadPage() {
  const { userPrivate, setUserWardrobe, userWardrobe, guestWardrobe, setGuestWardrobe, recentUploads, setRecentUploads, recentUserUploads, setRecentUserUploads } = useContext(MenuContext);
  const navigate = useNavigate();


  // ---------------------------------------
  // UPLOAD & FORM STATE
  // ---------------------------------------
  const [preview, setPreview] = useState(null);
  const [userPreview, setUserPreview] = useState(null);
  const [error, setError] = useState(null);

  const [uploadDetails, setUploadDetails] = useState({
    name: "",
    style: "",
    season: "",
    color: "",
    image: "",
    category: ""
  });

  const isUserLoggedIn = !!userPrivate;
  const activePreview = isUserLoggedIn ? userPreview : preview;
  const recentData = isUserLoggedIn ? recentUserUploads : recentUploads;

  // ---------------------------------------
  // HANDLE FILE UPLOAD
  // ---------------------------------------
  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Limit image to 1MB
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > 1) {
      setError("File is too large! Please upload an image under 1 MB.");
      if (isUserLoggedIn) setUserPreview(null);
      else setPreview(null);
      return;
    }

    setError(null);

    const base64 = await fileToBase64(file);
    if (isUserLoggedIn) setUserPreview(base64);
    else setPreview(base64);
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // ---------------------------------------
  // SAVE ITEM TO WARDROBE
  // ---------------------------------------
  function saveToWardrobe(e) {
    e.preventDefault();

    const imageToSave = isUserLoggedIn ? userPreview : preview;
    if (!imageToSave) return;

    const user = JSON.parse(localStorage.getItem("user"));

    const newItem = {
      id: crypto.randomUUID(),
      name: uploadDetails.name,
      style: uploadDetails.style,
      season: "all",
      color: uploadDetails.color,
      image: imageToSave,
      category: uploadDetails.category.toLowerCase(),
    };

    const map = {
      Top: "Tops",
      Bottom: "Bottoms",
      Footwear: "Footwears",
      Accessory: "Accessories",
    };
    const key = map[uploadDetails.category];
    if (!key) return;

    if (isUserLoggedIn) {
      // USER LOGGED IN
      const updated = {
        ...userWardrobe,
        [key]: [newItem, ...userWardrobe[key]],
      };

      setUserWardrobe(updated);

      localStorage.setItem(
        `wardrobe_${userPrivate.uid}`,
        JSON.stringify(updated)
      );

      setRecentUserUploads(prev => [imageToSave, ...(prev || []).slice(0, 4)]);
    }
    else {
      // GUEST USER
      const updated = {
        ...guestWardrobe,
        [key]: [newItem, ...guestWardrobe[key]],
      };

      setGuestWardrobe(updated);

      localStorage.setItem(
        "guest_wardrobe",
        JSON.stringify(updated)
      );
      setRecentUploads(prev => [imageToSave, ...(prev || []).slice(0, 4)]);
    }




    setPreview(null);
    setUserPreview(null);

    setUploadDetails({
      name: "",
      style: "",
      season: "",
      color: "",
      image: "",
      category: "",
    });
  }

  function removePreview() {
    setPreview(null);
    setUserPreview(null);
  }

  console.log(recentUploads);
  // ---------------------------------------
  // HANDLE FORM INPUT
  // ---------------------------------------
  function handleInputChange(e) {
    const { name, value } = e.target;
    setUploadDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  console.log(recentData);


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) console.log(userWardrobe);
    else console.log(guestWardrobe);

  }, [userWardrobe, guestWardrobe])

  // Button enabled state
  const isFormComplete =
    activePreview &&
    uploadDetails.name &&
    uploadDetails.style &&
    uploadDetails.color &&
    uploadDetails.category &&
    !error;

  // ---------------------------------------
  // FULL UI BELOW
  // ---------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#A0552D] to-[#2C150C] text-white relative overflow-hidden">

      {/* Header */}
      <div className="relative z-10 px-5 pt-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            Add Outfit <span className="text-sm opacity-70">👕</span>
          </h1>
          <p className="text-xs text-white/50">
            Add a new piece to your wardrobe
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 mt-6 px-4 flex items-center justify-center gap-6 w-full">

        {/* Upload/Preview Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">

          {!activePreview ? (
            <div className="flex flex-col items-center justify-center text-center p-10 min-h-[380px]">
              <div className="mb-5 h-20 w-20 rounded-full bg-[#A0552D]/30 flex items-center justify-center">
                <Upload className="h-10 w-10 text-white" />
              </div>

              <h3 className="text-lg font-semibold">Upload Outfit</h3>
              <p className="text-sm text-white/50 mt-1">
                Take a photo or select from gallery
              </p>

              <div className="mt-6 flex gap-3">
                <label
                  htmlFor="camera-input"
                  className="flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium cursor-pointer hover:bg-opacity-90"
                >
                  <Camera size={16} /> Camera
                </label>

                <label
                  htmlFor="gallery-input"
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm cursor-pointer hover:bg-white/20"
                >
                  <ImageIcon size={16} /> Gallery
                </label>
              </div>



              {/* Hidden Inputs */}
              <input
                id="camera-input"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />
              <input
                id="gallery-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={activePreview}
                className="w-full h-[380px] object-cover"
                alt="Outfit"
              />

              <button
                onClick={removePreview}
                className="absolute top-4 right-4 p-2 bg-black/60 rounded-full backdrop-blur hover:bg-black/80"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Details Panel */}
        {activePreview && (
          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl p-6 space-y-6">

            {/* Categories */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/60 mb-3">
                Category
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Top", icon: <Shirt size={18} /> },
                  { name: "Bottom", icon: <GiTrousers size={18} /> },
                  { name: "Footwear", icon: <FaShoePrints size={18} /> },
                  { name: "Accessory", icon: <Watch size={18} /> }
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() =>
                      setUploadDetails((prev) => ({ ...prev, category: c.name }))
                    }
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl transition ${uploadDetails.category === c.name
                      ? "bg-gradient-to-r from-[#A0552D] to-pink-600 shadow-lg"
                      : "bg-gray-800/80 hover:bg-gray-700"
                      }`}
                  >
                    {c.icon}
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="color"
                value={uploadDetails.color}
                onChange={handleInputChange}
                placeholder="Color"
                className="bg-gray-800/80 p-3 rounded-xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#A0552D]/50"
              />
              <input
                name="name"
                value={uploadDetails.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="bg-gray-800/80 p-3 rounded-xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#A0552D]/50"
              />
            </div>

            <input
              name="style"
              value={uploadDetails.style}
              onChange={handleInputChange}
              placeholder="Style (formal, gym, casual...)"
              className="w-full bg-gray-800/80 p-3 rounded-xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#A0552D]/50"
            />

            {/* Save Button */}
            <button
              onClick={saveToWardrobe}
              disabled={!isFormComplete}
              className={`w-full h-14 rounded-2xl font-semibold flex items-center justify-center gap-2 transition ${isFormComplete
                ? "bg-gradient-to-r from-[#A0552D] to-pink-600 hover:opacity-90"
                : "bg-gray-700 text-white/40 cursor-not-allowed"
                }`}
            >
              <CheckCircle2 className="h-5 w-5" />
              Save to Wardrobe
            </button>
          </div>
        )}
      </div>

      {/* Recent Uploads */}
      {Array.isArray(recentData) && recentData.length > 0 && (
        <div className="relative z-10 mt-12 px-4 pb-10">
          <h2 className="text-sm font-semibold text-white/60 mb-5 tracking-wide">
            Recently Added
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {recentData.map((img, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-white/10 border border-white/10 hover:border-[#A0552D] transition shadow-lg"
              >
                <img
                  src={img}
                  alt="recent"
                  className="h-52 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

  );
}
