import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center gap-2" style={{ width }}>
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect width="48" height="48" rx="12" fill="#1F2937" />
        <path
          d="M15 12V36"
          stroke="#FBBF24"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M15 14H27C30.3137 14 33 16.6863 33 20C33 22.5 31.5 24 29.5 24.5C31.8 25 34 27 34 30C34 33.3137 31.3137 36 28 36H15"
          stroke="#FBBF24"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="font-serif text-xl font-bold text-gray-900">Blogify</span>
    </div>
  )
}

export default Logo