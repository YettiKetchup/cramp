export const sleep = (time: number): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(null), time);
    });
}