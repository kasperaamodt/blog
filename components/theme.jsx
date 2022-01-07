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
            />
        </div>
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
