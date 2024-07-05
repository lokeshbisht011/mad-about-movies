'use client'

import React, { useEffect, useRef, useState } from 'react'
import bollywoodMovieCompleteDialogue from '/public/bollywoodMovieCompleteDialogue.json'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { BOLLYWOOD_GAME_SHARE_DESCRIPTION, BOLLYWOOD_GAME_SHARE_DESCRIPTION_GUESSED, BOLLYWOOD_GAME_URL, CHALLENGE_DIALOGUE_TITLE, GUESSES_ALLOWED, COMPLETE_DIALOGUE_DESCRIPTION, RANDOM_URL_PREFIX, COMPLETE_DIALOGUE_URL, INCORRECT_GUESS_MESSAGE, DIALOGUE_COMPLETED_DESCRIPTION } from '../utils/constants';
import levenshtein from 'fast-levenshtein';
import { nextMovie, numberToString, stringToNumber } from '../utils/utils';
import { challengeFriendPopup, gameCompletedPopup, giveUp } from '../utils/popups';

const MovieDialogue = ({ params }) => {

    const router = useRouter();

    const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
    const movieIndex = stringToNumber(movieIndexString);
    const currentData = bollywoodMovieCompleteDialogue[movieIndex];
    const hiddenPartLength = currentData.hiddenPart.length;
    const movieName = currentData.name;

    const movieUrl = BOLLYWOOD_GAME_URL + "/complete-dialogue/" + params.id;

    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [guessText, setGuessText] = useState('');

    const guess = () => {
        toast.dismiss();

        const hiddenPart = currentData.hiddenPart.toLowerCase();
        const userGuess = guessText.toLowerCase();
        const distance = levenshtein.get(userGuess, hiddenPart);
        const similarityThreshold = Math.floor(hiddenPart.length * 0.5);

        if (distance === 0) {
            setGameCompleted(true);
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
            title = `You completely the dialogue in just 1 guess!!! Amazing! Challenge your friends now.`;
        } else if (guesses < 4) {
            title = `You completely the dialogue in just ${guesses} guesses!!! Great job! Challenge your friends now.`;
        } else if (numberOfGuesses + 1 === GUESSES_ALLOWED) {
            toast("You've reached the maximum number of guesses. Better luck next time!");
            setGameCompleted(true);
        } else {
            title = `You completely the dialogue correctly in ${guesses} guesses! Challenge your friends now.`;
        }
        gameCompletedPopup(title, movieUrl, DIALOGUE_COMPLETED_DESCRIPTION(movieName, guesses));
    };

    const markGameCompleted = () => {
        setGameCompleted(true);
    }

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleInput = (e) => {
        const text = e.target.innerText;
        setGuessText(text);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
        const text = inputRef.current.textContent;
        if (text.length >= hiddenPartLength && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <Toaster />
            <div className="flex flex-col bg-bgSoft gap-4 p-10">
                <div className='justify-center text-center text-text text-2xl'>
                    <span className=''>Movie : {currentData.name}</span>
                </div>

                <div className="text-text max-w-xl text-center border p-5 border-textSoft">
                    <span className="text-4xl italic text-textSoft">&ldquo; {currentData.dialogue} </span>
                    <div
                        ref={inputRef}
                        contentEditable
                        className="inline-block text-4xl italic text-text border-b-2 border-textSoft bg-transparent outline-none"
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        spellCheck="false"
                        style={{ minWidth: '50px', display: 'inline-block', verticalAlign: 'bottom', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                    >
                    </div>
                    <span className="text-4xl italic text-textSoft">&rdquo;</span>
                    <div className="text-sm mt-2 text-textSoft">
                        {guessText.length}/{hiddenPartLength} characters
                    </div>
                </div>

                <div className="flex flex-col gap-5 items-center">
                    {!gameCompleted && (
                        <div className='flex items-center justify-center gap-10'>
                            <button onClick={guess} className="text-sm md:text-md bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">Guess</button>
                            <div>
                                <p className="text-sm md:text-md text-textSoft">Guesses: {numberOfGuesses}/{GUESSES_ALLOWED}</p>
                            </div>
                        </div>
                    )}
                    {
                        <div className='flex items-center justify-center gap-10 text-sm md:text-md'>
                            <button onClick={() => challengeFriendPopup(movieUrl, COMPLETE_DIALOGUE_DESCRIPTION(movieName))} className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">Share</button>
                            {!gameCompleted && (
                                <button onClick={() => giveUp(markGameCompleted)} className="bg-giveUpButton hover:bg-giveUpButtonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">Give Up</button>
                            )}
                            <button onClick={() => nextMovie(router, bollywoodMovieCompleteDialogue, COMPLETE_DIALOGUE_URL)} className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md">{gameCompleted ? 'Next' : 'Skip'}</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieDialogue;