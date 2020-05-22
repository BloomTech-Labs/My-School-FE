import { theme } from '@chakra-ui/core';

const customTheme = {
    ...theme, 
    colors: {
        black: "#000",
        white: "#FFF",
        darkgray01: "#101010",
        gray01: "#4E4E4E",
        gray02: "#A4A4A4",
        lightgray01: "#C8C8C8",
        lightgray02: "#FAFAFF",
        lightblue: "#DBE8FB",
        myschoolblue: "#375E97",
        myschoolyellow: "#FFBB00",
        myschoolorange: "#FB6542",
        systemgreen: "#49C281",
        warningred: "#FF5656"
    },
    fonts: {
        heading: "'Nunito', sans-serif",
        body: "'Nunito', sans-serif"
    },
    fontWeights: {
        light: 300,
        regular: 400,
        bold: 700
    },
    fontSizes: {
        xs: "12px",
        s: "14px",
        m: "16px",
        l: "18px",
        xl: "24px",
        "2xl": "36px"
    }
}
