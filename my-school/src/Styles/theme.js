import { theme } from '@chakra-ui/core';

const customTheme = {
    ...theme, 
    colors: {
        ...theme.colors,
        black: "#000",
        white: "#FFF",
        lightblue: "#DBE8FB",
        myschoolblue: "#375E97",
        myschoolyellow: "#FFBB00",
        myschoolorange: "#FB6542",
        systemgreen: "#49C281",
        warningred: "#FF5656",
        gray: {
            100: "#F7FAFC",
            200: "#EDF2F7",
            300: "#E2E8F0",
            400: "#CBD5E0",
            500: "#A0AEC0",
            600: "#718096",
            700: "#4A5568",
            800: "#2D3748",
            900: "#1A202C"
        },
        blue: {
            100: "#EBF8FF",
            200: "#BEE3F8",
            300: "#90CDF4",
            400: "#63B3ED",
            500: "#4299E1",
            600: "#3182CE",
            700: "#2B6CB0",
            800: "#2C5282",
            900: "#2A4365"
        },
        btnGray: {
            100: "#718096",
            200: '#bfbfbf',
            300: '#a6a6a6',
            400: '#8c8c8c',
            500: '#737373',
            600: '#595959',
            700: '#404040',
            800: '#262626',
            900: '#0d0d0d',
        },
        btnBlue: 
        {
          100: '#2A4365',
          200: '#a5bbda',
          300: '#82a0ca',
          400: '#6085b9',
          500: '#466ca0',
          600: '#35547d',
          700: '#253c5a',
          800: '#142438',
          900: '#010d18',
        },
        btnYellow: 
        {
          100: '#fff4b0',
          200: '#ffed80',
          300: '#ffdf22',
          400: '#ffe64f',
          500: '#e6c50e',
          600: '#b39a05',
          700: '#806e00',
          800: '#4d4200',
          900: '#1c1600',
        }
    },
    fonts: {
        heading: "'Nunito', sans-serif",
        body: "'Nunito', sans-serif"
    },
    fontWeights: {
        light: 300,
        regular: 400,
        bold: 700
    }
}

export default customTheme;
