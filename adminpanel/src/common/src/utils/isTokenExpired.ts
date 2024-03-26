export const isTokenExpired = (timestamp: number) => {
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    return timestamp < currentTime;
};