"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isMobile } from 'react-device-detect';
import { derangements } from '../utils/derangements';
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

        setAllImages(allImages);

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


    const [allImages, setAllImages] = useState([]);
    const [images, setImages] = useState([]);
    const [correctImages, setCorrectImages] = useState([]);
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
        var currentLength = correctImages.length;

        const correctIndexes = images.filter((image, index) => {
            if (image.correctIndex === (index + correctImages.length) && currentLength >= index) {
                currentLength++;
                return image;
            }
        });


        const updatedCorrectImages = [...correctImages, ...correctIndexes];
        setCorrectImages(updatedCorrectImages);

        const remainingImages = images.filter((image) => !correctIndexes.includes(image));
        setImages(remainingImages);

        if (updatedCorrectImages.length == 6) {
            toast.success(`You guessed the sequence correctly!`);
            setGameCompleted(true);
        } else if (correctIndexes.length > 0) {
            toast(`You guessed ${updatedCorrectImages.length} image(s) correctly! Keep going!`);
        } else {
            toast("Oops! None of your guesses are correct. Try again!");
        }
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
                setCorrectImages(allImages);
                setImages([]);
                setGameCompleted(true);
            }
        });
    }

    const nextMovie = () => {
        setRandomMovie();
        setCorrectImages([]);
    }

    return (
        <div className='flex flex-col gap-5 h-lvh'>
            <Toaster />
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <CustomDragLayer />
                <div className="grid grid-cols-2 bg-[color:var(--bgSoft)] gap-4 p-6">
                    {correctImages && correctImages.map((image, index) => (
                        <div key={index} className='md:h-[150px] md:w-[350px] sm:h-[120px] sm:w-[300px] h-[80px] w-[190px] relative border-4 border-green-500'>
                            <Image key={index} src={image.src} alt="" fill className='object-cover' />
                        </div>
                    ))}
                    {images.map((image, index) => (
                        <CustomImage
                            key={index}
                            src={image.src}
                            index={index}
                            moveImage={moveImage}
                        />
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
            <div className='flex items-center justify-center'>
                <Share url={BOLLYWOOD_GAME_URL} description={BOLLYWOOD_GAME_SHARE_DESCRIPTION} />
            </div>
        </div>
    );
};

export default Images;
