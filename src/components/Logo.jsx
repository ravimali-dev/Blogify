import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center gap-2" style={{ width }}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <rect width="24" height="24" rx="6" fill="#D97706" />
        <path
          d="M7 17L15 7M15 7H10M15 7V12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default Logo