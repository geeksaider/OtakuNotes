import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{vue,ts}", "./index.html"],
    theme: {
        extend: {},
        fontFamily: {
            logo: ['"Poppins", serif'],
            primary: ['"Montserrat", serif'],
        },
        colors: {
            first: "#C68DFF ",
            second: "#CBE857",
            third: "#323843",
        },
    },
    plugins: [],
} satisfies Config;
