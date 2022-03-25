import { ThemeProvider } from "next-themes";
import { createElement } from "react";
import { setup } from "goober";
import { prefix } from "goober/prefixer";
import "../style/global.css";

import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    KBarResults
} from "kbar";

setup(createElement, prefix);

function MyApp({ Component, pageProps }) {
    const actions = [
        {
            id: "blog",
            name: "Blog",
            shortcut: ["b"],
            keywords: "writing words",
            perform: () => (window.location.pathname = "blog")
        },
        {
            id: "contact",
            name: "Contact",
            shortcut: ["c"],
            keywords: "email",
            perform: () => (window.location.pathname = "contact")
        }
    ];

    return (
        <ThemeProvider>
            <KBarProvider actions={actions}>
                <KBarPortal>
                    <KBarPositioner>
                        <KBarAnimator>
                            <KBarSearch />
                            <KBarResults />
                        </KBarAnimator>
                    </KBarPositioner>
                </KBarPortal>
                <Component {...pageProps} />
            </KBarProvider>
        </ThemeProvider>
    );
}

export default MyApp;
