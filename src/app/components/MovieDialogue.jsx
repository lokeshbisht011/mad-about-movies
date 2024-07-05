'use client'

import React, { useState } from 'react'
import bollywoodMovieDialogues from '../../../public/bollywoodMovieDialogues.json';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { BOLLYWOOD_GAME_SHARE_DESCRIPTION, BOLLYWOOD_GAME_SHARE_DESCRIPTION_GUESSED, BOLLYWOOD_GAME_URL, CHALLENGE_DIALOGUE_TITLE, DIALOGUE_DESCRIPTION, DIALOGUE_GUESSED_DESCRIPTION, DIALOGUE_URL, GUESSES_ALLOWED, INCORRECT_GUESS_MESSAGE, RANDOM_URL_PREFIX } from '../utils/constants';
import levenshtein from 'fast-levenshtein';
import { nextMovie, stringToNumber } from '../utils/utils';
import { challengeFriendPopup, gameCompletedPopup, giveUp } from '../utils/popups';

const MovieDialogue = ({ params }) => {

    const router = useRouter();

    const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
    const movieIndex = stringToNumber(movieIndexString);

    const currentData = bollywoodMovieDialogues[movieIndex];
    const movieNameLength = currentData.name.length;

    const movieUrl = BOLLYWOOD_GAME_URL + "/dialogue/" + params.id;

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
        } else if (numberOfGuesses + 1 === GUESSES_ALLOWED) {
            toast("You've reached the maximum number of guesses. Better luck next time!");
            markGameCompleted();
        } else {
            title = `You guessed the movie correctly in ${guesses} guesses! Challenge your friends now.`;
        }
        gameCompletedPopup(title, movieUrl, DIALOGUE_GUESSED_DESCRIPTION(guesses));
    };

    return (
        <div className='flex flex-col gap-4 p-10 bg-bgSoft items-center rounded-lg shadow-md'>
            <Toaster />
            <div className="max-w-xl text-center border p-5 border-textSoft">
                <span className="text-3xl md:text-4xl italic text-textSoft">&ldquo; {currentData.dialogue} &rdquo;</span>
            </div>
            {gameCompleted &&
                <div className='justify-center text-center text-text text-2xl'>
                    <span className=''>Movie : {currentData.name}</span>
                </div>
            }
            <div className="flex flex-col gap-5 items-center">
                {!gameCompleted && (
                    <div className='flex flex-col gap-5 md:min-w-[30rem] min-w-[20rem]'>
                        <div className=''>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md p-2 w-full"
                                placeholder="Your guess..."
                                value={guessText}
                                maxLength={movieNameLength}
                                onChange={(e) => setGuessText(e.target.value)}
                            />
                            <div className="text-sm mt-2 text-right text-textSoft">
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
                        <button onClick={() => challengeFriendPopup(movieUrl, DIALOGUE_DESCRIPTION)} className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">Share</button>
                        {!gameCompleted && (
                            <button onClick={() => giveUp(markGameCompleted)} className="bg-giveUpButton hover:bg-giveUpButtonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">Give Up</button>
                        )}
                        <button onClick={() => nextMovie(router, bollywoodMovieDialogues, DIALOGUE_URL)} className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">{gameCompleted ? 'Next' : 'Skip'}</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default MovieDialogue;