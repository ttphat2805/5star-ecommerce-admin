/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#487eb0',
                secondary: '#282f53',
            },
            screens: {
                tablet: { max: '991px' },
            },
        },
    },
    plugins: [],
};
