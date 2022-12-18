export const subString = (str: string) => {
    if (str) {
        if (str.length > 30) {
            return str.substring(0, 30) + '...';
        } else {
            return str;
        }
    } else {
        return '';
    }
};
