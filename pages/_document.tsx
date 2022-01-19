import Document, { Html, Head, Main, NextScript } from "next/document";
import { extractCss } from "goober";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/images/icon.png" />
                    <script
                        async
                        defer
                        data-domain="aamodt.xyz"
                        src="https://analytics.brainify.no/js/plausible.js"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async ({ renderPage }) => {
    const page = await renderPage();
    const cssTag = <style id={"_goober"} dangerouslySetInnerHTML={{ __html: " " + extractCss() }} />
    return { ...page, cssTag };
}