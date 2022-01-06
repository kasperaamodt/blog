import { ThemeProvider } from 'next-themes'
import { createElement } from 'react';
import { setup } from 'goober';
import { prefix } from 'goober/prefixer';
import "../style/global.css";

setup(createElement, prefix);

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
