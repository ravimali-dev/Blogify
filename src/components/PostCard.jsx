import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, $createdAt }) {
  const date = $createdAt
    ? new Date($createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="overflow-hidden rounded-2xl mb-3 aspect-[16/10]">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h2 className="font-serif text-xl font-bold text-gray-900 leading-snug mb-1 group-hover:text-amber-700 transition-colors">
        {title}
      </h2>
      {date && <p className="text-sm text-gray-400">{date}</p>}
    </Link>
  )
}

export default PostCard