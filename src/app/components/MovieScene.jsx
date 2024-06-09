'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import bollywoodMovieScenes from '/public/bollywoodMovieScenes.json'
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { extractIdFromUrl, numberToString, stringToNumber } from '../utils/utils';
import { PREFIX, BOLLYWOOD_MOVIE_URL_PREFIX, BOLLYWOOD_GAME_SHARE_DESCRIPTION, BOLLYWOOD_GAME_SHARE_DESCRIPTION_GUESSED, BOLLYWOOD_GAME_URL, CHALLENGE_DIALOGUE_TITLE, RANDOM_URL_PREFIX } from '../utils/constants';
import Share from './Share';
import { useRouter } from 'next/navigation';
import levenshtein from 'fast-levenshtein';
import { createRoot } from 'react-dom/client';

const MovieScene = ({ params }) => {

    const router = useRouter();

    const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
    const movieIndex = stringToNumber(movieIndexString);

    const movieUrl = BOLLYWOOD_GAME_URL + "/scene/" + params.id;

    const currentData = bollywoodMovieScenes[movieIndex];
    const id = extractIdFromUrl(currentData.image);
    const sceneUrl = PREFIX + id;

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
        } else {
            title = `You guessed the movie correctly in ${guesses} guesses! Challenge your friends now.`;
        }

        const description = "I correctly guessed the movie from a scene in just " + guesses + " guesses. Can you beat my score?!";
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
        const description = "Can you guess the movie from the scene?!";
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
        const randomMovieIndex = Math.floor(Math.random() * bollywoodMovieScenes.length);
        const suffix = numberToString(randomMovieIndex);
        const newUrl = '/scene/' + RANDOM_URL_PREFIX + suffix;
        router.push(newUrl);
    }

    return (
        <div className='flex flex-col bg-bgSoft gap-5 p-5 justify-center items-center'>
            <Toaster />
            <div className='md:h-[300px] md:w-[700px] sm:h-[120px] sm:w-[300px] h-[80px] w-[190px] relative border-4 border-green-500'>
                <Image src={sceneUrl} alt="" fill className='object-cover' />
            </div>
            {gameCompleted &&
                <div className='justify-center text-center text-white text-2xl'>
                    <span className=''>Movie : {currentData.name}</span>
                </div>
            }
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
                                <p className="text-md text-gray-400">Guesses: {numberOfGuesses}</p>
                            </div>
                            
                        </div>
                    </div>
                )}
                {
                    <div className='flex items-center justify-center gap-10'>
                        <button onClick={challengeFriend} className="bg-button hover:bg-buttonHover text-white px-4 py-2 rounded-md">Challenge a friend</button>
                        <button onClick={giveUp} className="bg-giveUpButton hover:bg-giveUpButtonHover text-white px-4 py-2 rounded-md">Give Up</button>
                        <button onClick={nextMovie} className="bg-button hover:bg-buttonHover text-white px-4 py-2 rounded-md">{gameCompleted ? 'Next' : 'Skip'}</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default MovieScene;
