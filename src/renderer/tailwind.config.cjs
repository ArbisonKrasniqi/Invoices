/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.{js,jsx,html}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'], // Replace default sans-serif font with Roboto
            },
        },
    },
    plugins: [],
};