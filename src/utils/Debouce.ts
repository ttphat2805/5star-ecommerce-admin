export const Debounce = (func: any, time: number = 1000) => {
    let timer: any;
    return (...args: any) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
            timer = null;
        }, time);
    };
};
