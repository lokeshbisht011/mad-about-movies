'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import bollywoodMovies from '/public/bollywoodMovies.json'

const Page = () => {

    const router = useRouter();

    useEffect(() => {
        const randomMovieIndex = Math.floor(Math.random() * bollywoodMovies.length);
        // const newUrl = `/sequence/mamb${randomMovieIndex}`;
        const newUrl = `/sequence/mamb8`;
        router.push(newUrl);
    }, [router]);

    return (
        <div>
        </div>
    )
}

export default Page;
