export function extractIdFromUrl(url) {
    const match = url.match(/\/d\/([^\/]*)\/view/);
    return match ? match[1] : null;
};

export function numberToString(n) {
    let result = '';
    while (n >= 0) {
        result = String.fromCharCode((n % 26) + 97) + result;
        n = Math.floor(n / 26) - 1;
    }
    return result;
};

export function stringToNumber(s) {
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        result = result * 26 + (s.charCodeAt(i) - 97 + 1);
    }
    return result - 1;
};