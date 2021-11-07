import React, {useEffect, useState} from 'react';
import moment from "moment";
import Link from "next/link";
import {getRecentPosts, getSimilarPosts} from "../services";

const PostWidget = ({categories, slug}) => {
    const [relatedPosts, setRelatedPosts] = useState([])
    //  on our home page we can see the recent posts but if we go to the article we can see the related posts so  there's going to be a difference  keeping that in mind to know the
    //  difference we can check the slug and the  slug is going to be something that we're going to pass into the post widget  component

    useEffect(() => {
        if(slug){
            // we can get the similar post by knowing the category that post is in
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }
    },[slug])
    console.log(relatedPosts)
    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? 'Related Posts' : "Recent Posts" }
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <img src={post.featuredImage.url} alt={post.title} className=" w-16 h-16 align-middle rounded-full object-fill"/>
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 text-xs">
                            {moment(post.createdAt).format("MMM DD, YYYY")}
                        </p>
                        <Link href={`/post/${post.slug}`} className="text-md">
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;
