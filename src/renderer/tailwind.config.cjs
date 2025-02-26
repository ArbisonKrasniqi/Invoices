/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.{js,jsx,html}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'] // Replace default sans-serif font with Roboto
            },
            width: {
                a4: '21cm',
            },
            height: {
                a4: '29.7cm',
            },
            padding: {
                a4: '1cm',
            },
        },
    },
    plugins: [],
};