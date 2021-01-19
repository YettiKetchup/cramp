/**
 * 
 * Returns a random integer in range. Including a minimal value, excluding a maximum value.
 * 
 */
const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 
 * Returns a random intenger in range. Including a minimum and maximum value;
 * 
 */
const getRandomIntInclusive = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * Returns a random float numberin range. Excluding a maximum and minimum value;
 * 
 */
const getRandomFloat = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

export { getRandomInt, getRandomIntInclusive, getRandomFloat };