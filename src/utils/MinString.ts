export const subString = (str: string, length: number = 30) => {
    if (str) {
        if (str.length > 30) {
            return str.substring(0, length) + '...';
        } else {
            return str;
        }
    } else {
        return '';
    }
};
