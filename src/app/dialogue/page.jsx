'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import bollywoodMovieDialogues from '/public/bollywoodMovieDialogues.json'

const page = () => {

    const router = useRouter();

    const randomMovieIndex = Math.floor(Math.random() * bollywoodMovieDialogues.length);
    const newUrl = `/dialogue/mamb${randomMovieIndex}`;
    router.push(newUrl);

    return (
        <div>
        </div>
    )
}

export default page;
