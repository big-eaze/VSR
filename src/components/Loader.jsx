import React from "react";
import { LogoIcon } from "../utils/LogoIcon";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/95 z-50">
      {/* Logo */}
      <LogoIcon size={70} className="text-[#f04e23] mb-10 animate-pulse" />

      {/* Wave Loader */}
      <div className="flex items-end space-x-2">
        <span className="w-2 h-6 bg-[#f04e23] rounded-full animate-wave delay-[0ms]" />
        <span className="w-2 h-10 bg-[#f04e23] rounded-full animate-wave delay-[150ms]" />
        <span className="w-2 h-16 bg-[#f04e23] rounded-full animate-wave delay-[300ms]" />
        <span className="w-2 h-10 bg-[#f04e23] rounded-full animate-wave delay-[450ms]" />
        <span className="w-2 h-6 bg-[#f04e23] rounded-full animate-wave delay-[600ms]" />
      </div>

      {/* Loading Text */}
      <p className="mt-8 text-white/80 tracking-[0.3em] text-sm font-semibold">
        LOADING
      </p>
    </div>
  );
}
