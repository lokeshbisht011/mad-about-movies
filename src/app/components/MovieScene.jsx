'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import bollywoodMovieScenes from '/public/bollywoodMovieScenes.json'
import toast, { Toaster } from 'react-hot-toast';
import { extractIdFromUrl, nextMovie, stringToNumber } from '../utils/utils';
import { PREFIX, BOLLYWOOD_MOVIE_URL_PREFIX, BOLLYWOOD_GAME_SHARE_DESCRIPTION, BOLLYWOOD_GAME_SHARE_DESCRIPTION_GUESSED, BOLLYWOOD_GAME_URL, CHALLENGE_DIALOGUE_TITLE, RANDOM_URL_PREFIX, GUESSES_ALLOWED, SCENE_DESCRIPTION, SCENE_URL, INCORRECT_GUESS_MESSAGE, SCENE_GUESSED_DESCRIPTION } from '../utils/constants';
import { useRouter } from 'next/navigation';
import levenshtein from 'fast-levenshtein';
import { challengeFriendPopup, gameCompletedPopup } from '../utils/popups';

const MovieScene = ({ params }) => {

    const router = useRouter();

    const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
    const movieIndex = stringToNumber(movieIndexString);

    const movieUrl = BOLLYWOOD_GAME_URL + "/scene/" + params.id;

    const currentData = bollywoodMovieScenes[movieIndex];
    const id = extractIdFromUrl(currentData.image);
    const sceneUrl = PREFIX + id;
    const movieNameLength = currentData.name.length;

    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [guessText, setGuessText] = useState('');

    const markGameCompleted = () => {
        setGameCompleted(true);
    }

    const guess = () => {
        toast.dismiss();

        const actualMovieName = currentData.name.toLowerCase();
        const userGuess = guessText.toLowerCase();
        const distance = levenshtein.get(userGuess, actualMovieName);
        const similarityThreshold = Math.floor(actualMovieName.length * 0.5);

        if (distance === 0) {
            markGameCompleted();
            showGameCompletedDialog(numberOfGuesses + 1);
        } else if (distance <= similarityThreshold) {
            toast("Almost there! Your guess is very close. Try again!");
        } else if (numberOfGuesses + 1 === GUESSES_ALLOWED) {
            toast("You've reached the maximum number of guesses. Better luck next time!");
            markGameCompleted();
        } else {
            toast(INCORRECT_GUESS_MESSAGE);
        }

        setNumberOfGuesses(prev => prev + 1);
    };

    const showGameCompletedDialog = (guesses) => {
        let title;

        if (guesses === 1) {
            title = `You guessed the movie correctly in just 1 guess!!! Amazing! Challenge your friends now.`;
        } else if (guesses < 4) {
            title = `You guessed the movie correctly in just ${guesses} guesses!!! Great job! Challenge your friends now.`;
        } else {
            title = `You guessed the movie correctly in ${guesses} guesses! Challenge your friends now.`;
        }
        gameCompletedPopup(title, movieUrl, SCENE_GUESSED_DESCRIPTION(guesses));
    };

    const [loading, setLoading] = useState(true);
    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className='flex flex-col bg-bgSoft gap-5 p-5 justify-center items-center rounded-lg shadow-md'>
            <Toaster />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='md:h-[300px] md:w-[700px] h-[140px] w-[330px] relative border-4 border-green-500'>
                {loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                )}
                <Image src={sceneUrl} alt="" fill className='object-cover' onLoad={handleImageLoad} />
            </motion.div>
            {
                gameCompleted &&
                <div className='justify-center text-center text-white text-2xl'>
                    <span className=''>Movie : {currentData.name}</span>
                </div>
            }
            <div className="flex flex-col gap-5 items-center">
                {!gameCompleted && (
                    <div className='flex flex-col gap-5 min-w-[18rem] md:min-w-[30rem]'>
                        <div className=''>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md p-2 w-full"
                                placeholder="Your guess..."
                                value={guessText}
                                onChange={(e) => setGuessText(e.target.value)}
                                maxLength={movieNameLength}
                            />
                            <div className="text-sm mt-2 text-right text-text">
                                {guessText.length}/{movieNameLength} characters
                            </div>
                        </div>

                        <div className='flex items-center justify-center gap-10'>
                            <button onClick={guess} className="md:text-md text-sm bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">Guess</button>
                            <div>
                                <p className="md:text-md text-sm text-textSoft">Guesses: {numberOfGuesses}/{GUESSES_ALLOWED}</p>
                            </div>
                        </div>
                    </div>
                )}
                {
                    <div className='flex items-center justify-center gap-10 md:text-md text-sm'>
                        <button onClick={() => challengeFriendPopup(movieUrl, SCENE_DESCRIPTION)} className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">Share</button>
                        {!gameCompleted && (
                            <button onClick={() => giveUp(markGameCompleted)} className="bg-giveUpButton hover:bg-giveUpButtonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">Give Up</button>
                        )}
                        <button onClick={() => nextMovie(router, bollywoodMovieScenes, SCENE_URL)} className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">{gameCompleted ? 'Next' : 'Skip'}</button>
                    </div>
                }
            </div>
        </div >
    );
}

export default MovieScene;
