import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{vue,ts}", "./index.html"],
    theme: {
        extend: {
            colors: {
                first: "#E6E4D8 ",
                second: "#8C6D51",
                third: "#323843",
            },
        },
        fontFamily: {
            logo: ['"Poppins", serif'],
            primary: ['"Montserrat", serif'],
        },
    },
    plugins: [],
} satisfies Config;
