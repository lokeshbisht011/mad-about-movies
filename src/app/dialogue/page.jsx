import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import GuessMovie from './GuessMovie'
import Sidebar from '../components/Sidebar'

const HomeLayout = () => {
    return (
        <div className='flex flex-col'>
            {/* <Sidebar /> */}
            <Toaster />
            <div className='flex-1 justify-center text-center text-white p-10'>
                <span className=''>Guess the movie from the dialogue.</span>
            </div>
            <GuessMovie />
        </div>

    )
}

export default HomeLayout
