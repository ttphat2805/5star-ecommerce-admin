/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#319795',
                secondary: '#282f53',
                tbase: '#677788',
                hover: '#f5f8fa',
            },
            screens: {
                tablet: { max: '991px' },
            },
        },
    },
    plugins: [],
};
