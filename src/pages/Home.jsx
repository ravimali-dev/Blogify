import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) setPosts(posts.documents)
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-20 text-center bg-[#fdfbf7] min-h-[60vh]">
                <Container>
                    <h1 className="text-3xl font-serif font-bold text-gray-700">
                        No stories yet — be the first to write one!
                    </h1>
                </Container>
            </div>
        )
    }

    const [featured, ...rest] = posts;

    return (
        <div className='w-full bg-[#fdfbf7] min-h-screen pb-16'>
            <Container>
                {/* Hero / Featured post */}
                <Link to={`/post/${featured.$id}`} className="block group pt-10 pb-12 border-b border-gray-200">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="order-2 md:order-1">
                            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">Featured</span>
                            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4 leading-tight group-hover:text-amber-700 transition-colors">
                                {featured.title}
                            </h1>
                            <p className="text-gray-500">
                                {new Date(featured.$createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                        </div>
                        <div className="order-1 md:order-2 rounded-2xl overflow-hidden aspect-[16/10]">
                            <img
                                src={appwriteService.getFilePreview(featured.featuredImage)}
                                alt={featured.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </Link>

                {/* Recent posts grid */}
                {rest.length > 0 && (
                    <div className="pt-10">
                        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">More stories</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                            {rest.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home