"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isMobile } from 'react-device-detect';
import { derangements } from '../utils/derangements';
import ReactDOMServer from 'react-dom/server';
import bollywoodMovies from '/public/bollywoodMovies.json'
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { extractIdFromUrl } from '../utils/utils';
import CustomImage from './CustomImage';
import { PREFIX, BOLLYWOOD_MOVIE_URL_PREFIX, BOLLYWOOD_GAME_SHARE_DESCRIPTION, BOLLYWOOD_GAME_SHARE_DESCRIPTION_GUESSED, BOLLYWOOD_GAME_URL } from '../utils/constants';
import Share from './Share';
import CustomDragLayer from './CustomDragLayer';

const Images = () => {

    const setRandomMovie = () => {
        const randomMovieIndex = Math.floor(Math.random() * bollywoodMovies.length);
        const currentData = bollywoodMovies[randomMovieIndex];

        const allImages = Object.entries(currentData)
            .filter(([key, value]) => key.startsWith('image'))
            .map(([key, value]) => {
                const id = extractIdFromUrl(value);
                return {
                    src: `${PREFIX}${id}`,
                    correctIndex: parseInt(key.slice(-1)) - 1
                };
            });

        const setNewImages = (order) => {
            const newImages = Array(allImages.length).fill(null);
            order.forEach((index, i) => {
                newImages[index] = allImages[i];
            });
            setImages(newImages)
        }

        const randomIndex = Math.floor(Math.random() * derangements.length);

        setNewImages(derangements[randomIndex]);
    }

    const [images, setImages] = useState([]);
    const [correctIndex, setCorrectIndex] = useState(0);
    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);

    useEffect(() => {
        setRandomMovie();
    }, []);


    const moveImage = (dragIndex, hoverIndex) => {
        const newImages = [...images];
        const draggedImage = newImages[dragIndex];

        newImages.splice(dragIndex, 1);
        newImages.splice(hoverIndex, 0, draggedImage);

        setImages(newImages);
    };

    const checkSequence = () => {
        setNumberOfGuesses(prev => prev + 1);
        var lastCorrectIndex = 0;

        for (let i = 0; i < images.length; i++) {
            if (images[i].correctIndex === i) {
                lastCorrectIndex++;
            } else {
                break;
            }
        }

        setCorrectIndex(lastCorrectIndex);

        if (lastCorrectIndex == 6) {
            showGameCompletedDialog();
            setGameCompleted(true);
        } else if (lastCorrectIndex > 0) {
            toast(`You guessed ${lastCorrectIndex} image(s) correctly! Keep going!`);
        } else {
            toast("Oops! None of your guesses are correct. Try again!");
        }
    };

    const showGameCompletedDialog = () => {
        let title;

        if (numberOfGuesses === 1) {
            title = `You guessed the sequence correctly in just 1 guess!!! Amazing! Challenge your friends now.`;
        } else if (numberOfGuesses < 4) {
            title = `You guessed the sequence correctly in just ${numberOfGuesses} guesses!!! Great job! Challenge your friends now.`;
        } else {
            title = `You guessed the sequence correctly in ${numberOfGuesses} guesses! Challenge your friends now.`;
        }

        Swal.fire({
            title: title,
            html: ReactDOMServer.renderToString(
                <div className='flex items-center justify-center'>
                    <Share url={BOLLYWOOD_GAME_URL} description={BOLLYWOOD_GAME_SHARE_DESCRIPTION} />
                </div>
            ),
            showConfirmButton: false,
            width: 500,
        });
    };

    const giveUp = () => {
        Swal.fire({
            title: "Are you sure you want to give up?",
            showCancelButton: true,
            confirmButtonColor: "#182237",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            width: 500,
        }).then((result) => {
            if (result.isConfirmed) {
                setCorrectIndex(6);
                setGameCompleted(true);
                setImages(images => {
                    const sortedImages = [...images].sort((a, b) => a.correctIndex - b.correctIndex);
                    return sortedImages.map((image, index) => ({
                        ...image,
                        correctIndex: index
                    }));
                });
            }
        });
    }

    const nextMovie = () => {
        setRandomMovie();
        setGameCompleted(false);
        setCorrectIndex(0);
    }

    return (
        <div className='flex flex-col gap-5 h-lvh'>
            <Toaster />
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <CustomDragLayer />
                <div className="grid grid-cols-2 bg-[color:var(--bgSoft)] gap-4 p-6">
                    {images.map((image, index) => (
                        index >= correctIndex ? (
                            <CustomImage
                                key={index}
                                src={image.src}
                                index={index}
                                moveImage={moveImage}
                            />
                        ) : (
                            <div key={index} className='md:h-[150px] md:w-[350px] sm:h-[120px] sm:w-[300px] h-[80px] w-[190px] relative border-4 border-green-500'>
                                <Image src={image.src} alt="" fill className='object-cover' />
                            </div>
                        )
                    ))}
                </div>
            </DndProvider>
            {!gameCompleted && (
                <div className='flex items-center justify-center gap-10'>
                    <button onClick={checkSequence} className="px-4 py-2 mb-2 rounded-lg bg-green-500">Guess</button>
                    <button onClick={giveUp} className="px-4 py-2 mb-2 rounded-lg bg-green-500">Give Up</button>
                    <div>
                        <span className='text-white text-xl ml-auto'>Guesses: {numberOfGuesses}</span>
                    </div>
                </div>
            )}
            {
                gameCompleted && (
                    <div className='flex items-center justify-center gap-10'>
                        <button onClick={nextMovie} className="px-4 py-2 mb-2 rounded-lg bg-green-500">Next Movie</button>
                    </div>
                )
            }
        </div>
    );
};

export default Images;
