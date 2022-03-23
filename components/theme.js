import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { styled } from "goober";

export default function ThemeChanger() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div style={{ height: "34px", width: "34px" }}></div>;

    return (
        <Div className="tooltip">
            <Button
                onClick={() =>
                    setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
            />
            <span className="tooltiptext">Activate {resolvedTheme === "light" ? "dark" : "light"} mode</span>
        </Div>
    );
}

const Button = styled("div")`
    background: var(--foreground);
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    height: 24px;
    width: 24px;
`;

const Div = styled("div")`
    &.tooltip {
        position: relative;
    }
    &.tooltip .tooltiptext {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s;
        background-color: var(--foreground);
        color: var(--background);
        text-align: center;
        font-weight: 500;
        padding: 5px 10px;
        border-radius: 6px;
        position: absolute;
        z-index: 1;
        width: auto;
        bottom: -150%;
        right: 0;
        white-space: nowrap;
    }
    &.tooltip:hover .tooltiptext, &.tooltip:focus .tooltiptext {
        opacity: 1;
        visibility: visible;
    }
`;
