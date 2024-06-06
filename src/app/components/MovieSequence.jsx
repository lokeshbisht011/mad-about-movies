'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isMobile } from 'react-device-detect';
import { derangements } from '../utils/derangements';
import bollywoodMovies from '/public/bollywoodMovies.json'
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { extractIdFromUrl, numberToString, stringToNumber } from '../utils/utils';
import CustomImage from './CustomImage';
import { PREFIX, BOLLYWOOD_MOVIE_URL_PREFIX, BOLLYWOOD_GAME_SHARE_DESCRIPTION, BOLLYWOOD_GAME_SHARE_DESCRIPTION_GUESSED, BOLLYWOOD_GAME_URL, RANDOM_URL_PREFIX, CHALLENGE_DIALOGUE_TITLE } from '../utils/constants';
import Share from './Share';
import CustomDragLayer from './CustomDragLayer';
import { useRouter } from 'next/navigation';
import { createRoot } from 'react-dom/client';

const MovieSequence = ({ params }) => {

    const router = useRouter();

    const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
    const movieIndex = stringToNumber(movieIndexString);

    const movieUrl = BOLLYWOOD_GAME_URL + "/sequence/" + params.id;

    const setRandomMovie = (currentData) => {
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
    const [movieName, setMovieName] = useState();

    useEffect(() => {
        const currentData = bollywoodMovies[movieIndex];
        setMovieName(currentData.name);
        setRandomMovie(currentData);
    }, []);


    const moveImage = (dragIndex, hoverIndex) => {
        const newImages = [...images];
        const draggedImage = newImages[dragIndex];

        newImages.splice(dragIndex, 1);
        newImages.splice(hoverIndex, 0, draggedImage);

        setImages(newImages);
    };

    const guess = () => {
        toast.dismiss();
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
            setGameCompleted(true);
            showGameCompletedDialog(numberOfGuesses + 1);
        } else if (lastCorrectIndex > 0) {
            toast(`You guessed ${lastCorrectIndex} image(s) correctly! Keep going!`);
        } else {
            toast("Oops! None of your guesses are correct. Try again!");
        }
        setNumberOfGuesses(prev => prev + 1);
    };

    const showGameCompletedDialog = (guesses) => {
        let title;

        if (guesses === 1) {
            title = `You guessed the sequence correctly in just 1 guess!!! Amazing! Challenge your friends now.`;
        } else if (guesses < 4) {
            title = `You guessed the sequence correctly in just ${guesses} guesses!!! Great job! Challenge your friends now.`;
        } else {
            title = `You guessed the sequence correctly in ${guesses} guesses! Challenge your friends now.`;
        }

        const description = "I correctly arranged the scenes from " + movieName + " in just " + guesses + " guesses. Can you beat my score?!";

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

    const challengeFriend = () => {
        const description = "Can you correctly sequence the scenes from " + movieName + "?!";
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
        const randomMovieIndex = Math.floor(Math.random() * bollywoodMovies.length);
        const suffix = numberToString(randomMovieIndex);
        const newUrl = '/sequence/' + RANDOM_URL_PREFIX + suffix;
        router.push(newUrl);
    }

    return (
        <div className='flex flex-col bg-bgSoft gap-5 p-5'>
            <div className='justify-center text-center text-text text-2xl'>
                <span className=''>Movie : {movieName}</span>
            </div>
            <Toaster />
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <CustomDragLayer />
                <div className="grid grid-cols-2 gap-4">
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
                    <button onClick={guess} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Guess</button>
                    <div>
                        <p className="text-md text-gray-400">Guesses: {numberOfGuesses}</p>
                    </div>
                    <button onClick={giveUp} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Give Up</button>
                </div>
            )}
            {
                <div className='flex items-center justify-center gap-10'>
                    <button onClick={challengeFriend} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Challenge a friend</button>
                    <button onClick={nextMovie} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">{gameCompleted ? 'Next' : 'Skip'}</button>
                </div>
            }
        </div>
    );
}

export default MovieSequence;
