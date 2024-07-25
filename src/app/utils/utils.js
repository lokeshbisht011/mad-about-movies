import { RANDOM_URL_PREFIX } from "./constants";

export function extractIdFromUrl(url) {
  const match = url.match(/\/d\/([^\/]*)\/view/);
  return match ? match[1] : null;
}

export function numberToString(n) {
  let result = "";
  while (n >= 0) {
    result = String.fromCharCode((n % 26) + 97) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
}

export function stringToNumber(s) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    result = result * 26 + (s.charCodeAt(i) - 97 + 1);
  }
  return result - 1;
}

export function getSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const nextMovie = (router, jsonFile, urlType) => {
  const randomMovieIndex = Math.floor(Math.random() * jsonFile.length);
  const suffix = numberToString(randomMovieIndex);
  const newUrl = "/" + urlType + "/" + RANDOM_URL_PREFIX + suffix;
  router.push(newUrl);
};

export const generateRandomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};
