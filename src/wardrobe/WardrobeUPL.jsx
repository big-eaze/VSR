
import React, { useContext, useEffect, useState } from "react";
import { Camera, Upload, Image as ImageIcon, X, CheckCircle2, ArrowLeft, } from "lucide-react";
import { Shirt, Watch } from "lucide-react";
import { GiTrousers } from "react-icons/gi";
import { FaShoePrints } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MenuContext } from "../utils/MenuContext";

export default function WardrobeUploadPage() {
  const [preview, setPreview] = useState(null);
  const [recentUploads, setRecentUploads] = useState(() => {
    const saved = localStorage.getItem("recent",)
    return saved ? JSON.parse(saved) : [];
  });
  const [uploadDetails, setUploadDetails] = useState({
    name: "",
    style: "",
    season: "",
    color: "",
    image: "",
    category: ""
  });


  const { setWardrobeOverall } = useContext(MenuContext);


  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
  };


  function removePreview() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  };

  function saveToWardrobe(e) {
    e.preventDefault();

    if (preview) {
      setRecentUploads([preview, ...recentUploads.slice(0, 4)]);
      setPreview(null);
    };


    if (preview && uploadDetails) {
      const newItem = {
        id: crypto.randomUUID(),
        name: uploadDetails.name,
        style: uploadDetails.style,
        season: "all",
        color: uploadDetails.color,
        image: preview,
        category: uploadDetails.category.toLowerCase(),
      };

      setWardrobeOverall((prev) => {
        const map = {
          Top: "Tops",
          Bottom: "Bottoms",
          Footwear: "Footwears",
          Accessory: "Accessories",
        };

        const key = map[uploadDetails.category];
        if (!key) return prev;


        return {
          ...prev,
          [key]: [newItem, ...prev[key]], // add to correct category
        };
      });

      // also update local "recent uploads" UI
      setRecentUploads([preview, ...recentUploads.slice(0, 4)]);
      setPreview(null);
      setUploadDetails({
        name: "",
        style: "",
        season: "",
        color: "",
        image: "",
        category: "",
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recentUploads));
  }, [recentUploads]);


  function handleInputChange(e) {

    const { name, value } = e.target;
    setUploadDetails(
      (prev) => (
        {
          ...prev,
          [name]: value
        }
      ))
    console.log(uploadDetails);
  }

  //this logic activates/enables the save wardrobe button 
  // when all relevant fields have been filled
  const isFormComplete =
    preview &&
    uploadDetails.name &&
    uploadDetails.style &&
    uploadDetails.color &&
    uploadDetails.category;





  return (
    <div className="min-h-screen bg-gradient-to-br w-full from-gray-900 via-[#A0552D] to-black px-4 sm:px-6 py-5">
      {/* Header */}
      <div>
        <div className="p-1 rounded-full w-fit mb-4 sm:mb-0 hover:bg-gray-700/50">
          <Link to="/" className=" ">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            Add a New Outfit 👕
          </h1>
          <p className="mt-2 text-white/50">
            Upload or snap your latest fit to add it to your wardrobe.
          </p>
        </div>
      </div>


      {/* Upload Section */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          {!preview ? (
            <div className="flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-transparent bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
                <Upload className="h-10 w-10 text-indigo-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">
                Upload Your Outfit
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Take a photo or choose one from storage.
              </p>

              {/* Two Buttons */}
              <div className="mt-6 flex gap-3">
                {/* Camera trigger */}
                <label
                  htmlFor="camera-input"
                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1 text-sm text-indigo-600 shadow-sm cursor-pointer hover:bg-indigo-100"
                >
                  <Camera className="h-4 w-4" /> Camera
                </label>

                {/* Gallery trigger */}
                <label
                  htmlFor="gallery-input"
                  className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600 shadow-sm cursor-pointer hover:bg-gray-200"
                >
                  <ImageIcon className="h-4 w-4" /> Gallery
                </label>
              </div>
            </div>
          ) : (
            <div className="relative animate-fadeIn">
              <img
                src={preview}
                alt="Preview"
                className="h-60 w-full rounded-xl object-cover shadow-md"
              />
              <form>
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-gray-300">Choose Category</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Top", value: "Tops", icon: <Shirt size={18} /> },
                      { name: "Bottom", value: "Bottoms", icon: <GiTrousers size={18} /> },
                      { name: "Footwear", value: "Footwears", icon: <FaShoePrints size={18} /> },
                      { name: "Accessory", value: "Accessories", icon: < Watch size={18} /> },
                    ].map((c) => (
                      <div
                        key={c.name}
                        onClick={() => {
                          setUploadDetails(
                            (prev) => (
                              {
                                ...prev,
                                category: c.name
                              }
                            ))

                        }}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition ${uploadDetails.category === c.name
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          }`}
                      >
                        {c.icon}
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full space-y-2 mt-6">
                  <div className="w-full grid grid-cols-2 gap-3">
                    <input onChange={handleInputChange} name="color" value={uploadDetails.color} type="text" placeholder="enter color" className="bg-gray-800 outline-none text-white w-full p-3 rounded-lg" />
                    <input onChange={handleInputChange} name="name" value={uploadDetails.name} type="text" placeholder="enter name" className="bg-gray-800 outline-none text-white w-full p-3 rounded-lg" />
                  </div>
                  <input onChange={handleInputChange} name="style" value={uploadDetails.style} type="text" placeholder="enter style e.g formal, fashion, gym-fit, casual." className="bg-gray-800 text-white w-full p-3 outline-none rounded-lg" />
                </div>

                <button
                  onClick={removePreview}
                  className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-gray-600 shadow hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
                {/* Action button */}
                {preview && (
                  <button
                    onClick={saveToWardrobe}
                    disabled={!isFormComplete}
                    className={`mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-white font-medium shadow-md  flex items-center justify-center gap-2 ${isFormComplete ? "transition hover:bg-indigo-700" : "disabled:opacity-50 cursor-not-allowed"} `}
                  >
                    <CheckCircle2 className="h-5 w-5" /> Save to Wardrobe
                  </button>
                )}
              </form>

            </div>
          )}

          {/* Hidden Inputs */}
          <input
            id="camera-input"
            type="file"
            accept="image/*"
            capture="environment"   // forces camera
            className="hidden"
            onChange={handleFileChange}
          />

          <input
            id="gallery-input"
            type="file"
            accept="image/*"
            className="hidden"     // opens gallery
            onChange={handleFileChange}
          />


        </div>
      </div>

      {/* Recent Uploads */}
      {recentUploads.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-white/50 mb-4">
            Recently Added
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {recentUploads.map((img, idx) => (
              <div className="p-2 bg-white/10 rounded-lg border-transparent border shadow-lg transition hover:border-indigo-500 hover:shadow-xl" key={idx}>
                <img
                  src={img}
                  alt={`Recent ${idx}`}
                  className="h-52 w-full  object-cover shadow-sm hover:shadow-md transition"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
