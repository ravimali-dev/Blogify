import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="bg-[#fdfbf7] min-h-screen py-10">
            <Container>
                <div className="max-w-2xl mx-auto">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-gray-400 mb-6">
                        {new Date(post.$createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </p>

                    <div className="w-full mb-8 rounded-2xl overflow-hidden">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full max-h-[420px] object-cover"
                        />
                    </div>

                    {isAuthor && (
                        <div className="flex gap-2 mb-8">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                    <div className="browser-css prose prose-lg max-w-none font-serif text-gray-800">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}