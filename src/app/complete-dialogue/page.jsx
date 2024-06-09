'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import bollywoodMovieDialogues from '/public/bollywoodMovieDialogues2.json'
import { RANDOM_URL_PREFIX } from '@/app/utils/constants';
import { numberToString } from '@/app/utils/utils';

const Page = () => {

    const router = useRouter();

    useEffect(() => {
        const randomMovieIndex = Math.floor(Math.random() * bollywoodMovieDialogues.length);
        const suffix = numberToString(randomMovieIndex);
        const newUrl = '/complete-dialogue/' + RANDOM_URL_PREFIX + suffix;
        router.push(newUrl);
    }, [router]);

    return (
        <div>
        </div>
    )
}

export default Page;
