import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { styled } from "goober";

export default function ThemeChanger() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div style={{ height: "34px", width: "34px" }}></div>;

    return (
        <div>
            <Button
                onClick={() =>
                    setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
            >
                {resolvedTheme === "light" ? (
                    <Black />
                ) : (
                    <White />
                )}
            </Button>
        </div>
    );
}

const Button = styled("div")`
    background: var(--mode);
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
`;

const Black = styled("div")`
    height: 24px;
    width: 24px;
    background-color: black;
    border-radius: 50%;
`;

const White = styled("div")`
    height: 24px;
    width: 24px;
    background-color: white;
    border-radius: 50%;
`;
