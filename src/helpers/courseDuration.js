export const courseDuration = (time) => {
    let hours = Math.floor(parseInt(time) / 60);
    let minutes = parseInt(time) % 60;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} hours`;
};
