import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import * as React from "react";
import {ThemeProvider} from "@mui/material/styles";
import {Box, Button, Container} from "@mui/material";
import {ReactNode} from "react";
import Footer from "./Footer";
import {Toaster} from "react-hot-toast";

const sections = [
    {title: 'Inicio', url: '/'},
    {title: 'Sistemas Solares', url: '/sistemaSolar'},
];

type Props = {
    children?: ReactNode
    title_head?: string
}

const Layout = ({children, title_head = 'This is the default title'}: Props) => (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth="lg">
            <Header title={title_head} sections={sections}/>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
            </Box>

            <Box>
                {children}
            </Box>

        </Container>

        <Footer
            title="Soy el pie de pagina"
            description="Ignoreme a mi tambien"
        />
        <Toaster
            position="bottom-center"
            reverseOrder={false}
        />
    </ThemeProvider>
);

export const getServerSideProps = async () => {

    const res = await fetch('http://localhost:3000/api/sistemaSolar')

    const sistemas = await res.json()

    return {
        props: {
            lista: sistemas,
        },
    };

}

export default Layout