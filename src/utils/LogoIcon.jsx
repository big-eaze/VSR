import React from "react";

export const LogoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    width={props.size || 40}
    height={props.size || 40}
    role="img"
    aria-label="VSA diamond mark"
    {...props}
  >
    <defs>
      <linearGradient id="gD" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#f97316" />
        <stop offset="1" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <rect width="128" height="128" rx="20" fill="none" />
    <g transform="translate(16,16)">
      <polygon points="48,0 96,48 48,96 0,48" fill="url(#gD)" />
      <circle cx="48" cy="48" r="14" fill="#ffffff" opacity="0.95" />
      <path
        d="M48 22 L48 74"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.18"
      />
    </g>
  </svg>
);
