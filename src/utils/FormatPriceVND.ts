export const FormatPriceVND = (value: number) => {
    return value.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
};
