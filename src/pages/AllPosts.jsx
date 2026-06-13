import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) setPosts(posts.documents)
        })
    }, [])

    return (
        <div className='w-full bg-[#fdfbf7] min-h-screen py-12'>
            <Container>
                <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
                    All Posts
                </h1>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts