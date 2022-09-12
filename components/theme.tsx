import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b4',
        },
        secondary: {
            main: '#f50056',
        },
        error: {
            main: '#f44335',
        },
        warning: {
            main: '#ff9801',
        },
        info: {
            main: '#2196f3',
        },
        success: {
            main: '#4caf50',
        },

        divider: 'rgba(255,255,255,0.11)',

        background: {
            default: '#303030',
            paper: '#424242',
        },
        text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
        action: {
            disabled: "white",
        },

        contrastThreshold: 3,

        tonalOffset: 0.2,
    },
});



export default theme;