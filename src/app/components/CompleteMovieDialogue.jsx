'use client'

import React, { useState } from 'react'
import bollywoodMovieDialogues from '../../../public/bollywoodMovieDialogues.json';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { BOLLYWOOD_GAME_SHARE_DESCRIPTION, BOLLYWOOD_GAME_SHARE_DESCRIPTION_GUESSED, BOLLYWOOD_GAME_URL, CHALLENGE_DIALOGUE_TITLE, GUESSES_ALLOWED, RANDOM_URL_PREFIX } from '../utils/constants';
import Share from './Share';
import levenshtein from 'fast-levenshtein';
import { createRoot } from 'react-dom/client';
import { numberToString, stringToNumber } from '../utils/utils';

const MovieDialogue = ({ params }) => {

    const router = useRouter();

    const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
    const movieIndex = stringToNumber(movieIndexString);

    const currentData = bollywoodMovieDialogues[movieIndex];

    const movieUrl = BOLLYWOOD_GAME_URL + "/complete-dialogue/" + params.id;

    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [guessText, setGuessText] = useState('');

    const guess = () => {
        toast.dismiss();

        const actualMovieName = currentData.name.toLowerCase();
        const userGuess = guessText.toLowerCase();
        const distance = levenshtein.get(userGuess, actualMovieName);
        const similarityThreshold = Math.floor(actualMovieName.length * 0.5);

        if (distance === 0) {
            setGameCompleted(true);
            showGameCompletedDialog(numberOfGuesses + 1);
        } else if (distance <= similarityThreshold) {
            toast("Almost there! Your guess is very close. Try again!");
        } else {
            toast("Oops! Your guess is incorrect. Try again!");
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
            setGameCompleted(true);
        } else {
            title = `You guessed the movie correctly in ${guesses} guesses! Challenge your friends now.`;
        }

        const description = "I correctly guessed the movie from a dialogue in just " + guesses + " guesses. Can you beat my score?!";

        Swal.fire({
            title: title,
            html: '<div id="share-container"></div>',
            didOpen: () => {
                const container = document.getElementById('share-container');
                if (container) {
                    const root = createRoot(container);
                    root.render(
                        <div className='flex items-center justify-center'>
                            <Share url={movieUrl} description={description} />
                        </div>
                    );

                    Swal.getPopup().addEventListener('willClose', () => {
                        root.unmount();
                    });
                }
            },
            showConfirmButton: false,
            width: 500,
        });
    };

    const giveUp = () => {
        toast.dismiss();
        Swal.fire({
            title: "Are you sure you want to give up?",
            showCancelButton: true,
            confirmButtonColor: "#182237",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            width: 500,
        }).then((result) => {
            if (result.isConfirmed) {
                setGameCompleted(true);
            }
        });
    }

    const challengeFriend = () => {
        const description = "I challenge you to guess the movie from a dialogue!!\n\n";
        Swal.fire({
            title: CHALLENGE_DIALOGUE_TITLE,
            html: '<div id="share-container"></div>',
            didOpen: () => {
                const container = document.getElementById('share-container');
                if (container) {
                    const root = createRoot(container);
                    root.render(
                        <div className='flex items-center justify-center'>
                            <Share url={movieUrl} description={description} />
                        </div>
                    );

                    Swal.getPopup().addEventListener('willClose', () => {
                        root.unmount();
                    });
                }
            },
            showConfirmButton: false,
            width: 500,
        });
    }

    const nextMovie = () => {
        const randomMovieIndex = Math.floor(Math.random() * bollywoodMovieDialogues.length);
        const suffix = numberToString(randomMovieIndex);
        const newUrl = '/complete-dialogue/' + RANDOM_URL_PREFIX + suffix;
        router.push(newUrl);
    }

    return (
        <div className='flex flex-col items-center'>
            <Toaster />
            <div className="flex flex-col bg-bgSoft gap-4 p-10">
                <div className='justify-center text-center text-white text-2xl'>
                    <span className=''>Movie : {currentData.name}</span>
                </div>
                <div className="text-white max-w-xl text-center border p-5 border-textSoft">
                    <span className="text-4xl italic text-textSoft">&ldquo; {currentData.dialogue} &rdquo;</span>
                </div>

                <div className="flex flex-col gap-5 items-center">
                    {!gameCompleted && (
                        <div className='flex flex-col gap-5 min-w-[20rem]'>
                            <div className=''>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    placeholder="Your guess..."
                                    value={guessText}
                                    onChange={(e) => setGuessText(e.target.value)}
                                />
                            </div>
                            <div className='flex items-center justify-center gap-10'>
                                <button onClick={guess} className="bg-button hover:bg-buttonHover text-white px-4 py-2 rounded-md">Guess</button>
                                <div>
                                    <p className="text-md text-gray-400">Guesses: {numberOfGuesses}/{GUESSES_ALLOWED}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {
                        <div className='flex items-center justify-center gap-10'>
                            <button onClick={challengeFriend} className="bg-button hover:bg-buttonHover text-white px-4 py-2 rounded-md">Challenge a friend</button>
                            {!gameCompleted && (
                                <button onClick={giveUp} className="bg-giveUpButton hover:bg-giveUpButtonHover text-white px-4 py-2 rounded-md">Give Up</button>
                            )}
                            <button onClick={nextMovie} className="bg-button hover:bg-buttonHover text-white px-4 py-2 rounded-md">{gameCompleted ? 'Next' : 'Skip'}</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieDialogue;