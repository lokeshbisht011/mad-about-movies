'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import bollywoodMovies from '/public/bollywoodMovies.json'

const page = () => {

    const router = useRouter();

    const randomMovieIndex = Math.floor(Math.random() * bollywoodMovies.length);
    const newUrl = `/sequence/mamb${randomMovieIndex}`;
    router.push(newUrl);

    console.log(bollywoodMovies);

    return (
        <div>
        </div>
    )
}

export default page;
