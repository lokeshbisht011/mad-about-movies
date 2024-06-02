'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import bollywoodMovieScenes from '/public/bollywoodMovieScenes.json'

const page = () => {

    const router = useRouter();

    const randomMovieIndex = Math.floor(Math.random() * bollywoodMovieScenes.length);
    const newUrl = `/scene/mamb${randomMovieIndex}`;
    router.push(newUrl);

    return (
        <div>
        </div>
    )
}

export default page;
