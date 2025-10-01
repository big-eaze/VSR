import React from "react";

export default function FallbackLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
    </div>
  );
}

