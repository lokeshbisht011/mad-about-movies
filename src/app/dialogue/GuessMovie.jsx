import React from 'react'
import bollywoodMovieDialogues from '../../../public/bollywoodMovieDialogues.json';

const GuessMovie = () => {

    const randomMovieIndex = Math.floor(Math.random() * bollywoodMovieDialogues.length);
    const currentData = bollywoodMovieDialogues[randomMovieIndex];

    return (
        <div className='flex flex-col gap-5 h-lvh items-center'>
            <div className="flex flex-col bg-[color:var(--bgSoft)] gap-4 p-6">
                <div className="text-white max-w-lg text-center">
                    <p className="text-lg">{currentData.dialogue}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Your guess..."
                    />
                    <div className="flex gap-2 items-center justify-center pt-3">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Guess</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Give Up</button>
                    </div>
                    <p className="text-sm text-gray-400 text-center pt-3">Number of Guesses: 0</p>
                </div>
            </div>
        </div>
    )
}

export default GuessMovie;