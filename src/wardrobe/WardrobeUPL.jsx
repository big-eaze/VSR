
import React, { useState } from "react";
import { Camera, Upload, Image as ImageIcon, X, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function WardrobeUploadPage() {
  const [preview, setPreview] = useState(null);
  const [recentUploads, setRecentUploads] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);

      return () => URL.revokeObjectURL(objectURL);
    }
  };

  const removePreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
  };

  const saveToWardrobe = () => {
    if (preview) {
      setRecentUploads([preview, ...recentUploads.slice(0, 4)]);
      setPreview(null);
    }
  };

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
          <label
            htmlFor="file-input"
            className="group relative block cursor-pointer rounded-2xl border-2 border-dashed border-transparent bg-white p-8 shadow-lg transition hover:border-indigo-500 hover:shadow-xl"
          >
            {!preview ? (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition">
                  <Upload className="h-10 w-10 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Upload Your Outfit
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Take a photo or choose one from storage.
                </p>

                <div className="mt-6 flex gap-3">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1 text-sm text-indigo-600 shadow-sm group-hover:bg-indigo-100">
                    <Camera className="h-4 w-4" /> Camera
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600 shadow-sm group-hover:bg-gray-200">
                    <ImageIcon className="h-4 w-4" /> Gallery
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative animate-fadeIn">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-60 w-full rounded-xl object-cover shadow-md"
                />
                <button
                  onClick={removePreview}
                  className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-gray-600 shadow hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </label>

          {/* hidden input */}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Action button */}
          {preview && (
            <button
              onClick={saveToWardrobe}
              className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-white font-medium shadow-md transition hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="h-5 w-5" /> Save to Wardrobe
            </button>
          )}
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
