export const PREFIX = "https://drive.usercontent.google.com/download?id=";
export const BOLLYWOOD_GAME_URL = "https://madaboutmovies.in";
export const BOLLYWOOD_GAME_SHARE_DESCRIPTION = "Challenge";
export const BOLLYWOOD_GAME_SHARE_DESCRIPTION_GUESSED = (tries) => `I correctly guessed the sequence in ${tries} tries. Can you do it too?`;
export const RANDOM_URL_PREFIX = "tijwkoa";
export const CHALLENGE_DIALOGUE_TITLE = "Challenge your friends!!!";
export const GUESSES_ALLOWED = 10;
export const COMPLETE_DIALOGUE_DESCRIPTION = (movieName) => `I challenge you to complete this dialogue from ${movieName}!!\n\n`;
export const SEQUENCE_DESCRIPTION = (movieName) => `Can you correctly sequence the scenes from ${movieName}?!\n\n`;
export const SCENE_DESCRIPTION = "Can you guess the movie from the scene?!\n\n";
export const DIALOGUE_DESCRIPTION = "I challenge you to guess the movie from a dialogue!!\n\n";

export const SEQUENCE_URL = "sequence";
export const SCENE_URL = "scene";
export const DIALOGUE_URL = "dialogue";
export const COMPLETE_DIALOGUE_URL = "complete-dialogue";

export const SEQUENCE_COMPLETED_DESCRIPTION = (movieName, guesses) => `I correctly arranged the scenes from ${movieName} in just ${guesses} guesses. Can you beat my score?!`;
export const SCENE_GUESSED_DESCRIPTION = (guesses) => `I correctly guessed the movie from a scene in just ${guesses} guesses. Can you beat my score?!`;
export const DIALOGUE_GUESSED_DESCRIPTION = (guesses) => `I correctly guessed the movie from a dialogue in just ${guesses} guesses. Can you beat my score?!`;
export const DIALOGUE_COMPLETED_DESCRIPTION = (movieName, guesses) => `I completed this dialogue from ${movieName} in just ${guesses} guesses. Can you beat my score?!`;

export const INCORRECT_GUESS_MESSAGE = "Oops! Your guess is incorrect. Try again!";
export const INCORRECT_SEQUENCE_GUESS_MESSAGE = "Oops! None of your guesses are correct. Try again!"