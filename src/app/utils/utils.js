export function extractIdFromUrl(url) {
    const match = url.match(/\/d\/([^\/]*)\/view/);
    return match ? match[1] : null;
}

