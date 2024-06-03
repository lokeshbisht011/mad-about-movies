'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import bollywoodMovieScenes from '/public/bollywoodMovieScenes.json'

const Page = () => {

    const router = useRouter();

    useEffect(() => {
        const randomMovieIndex = Math.floor(Math.random() * bollywoodMovieScenes.length);
        const newUrl = `/scene/mamb${randomMovieIndex}`;
        router.push(newUrl);
    }, [router]);

    return (
        <div>
        </div>
    )
}

export default Page;
