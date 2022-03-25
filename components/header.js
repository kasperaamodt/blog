import { styled } from "goober";
import { useTheme } from "next-themes";
import ThemeChanger from "./theme";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const { resolvedTheme } = useTheme();
    return (
        <Wrapper>
            <Link href="/" passHref>
                <Image
                    src={
                        resolvedTheme === "light"
                            ? "/images/k-black.svg"
                            : "/images/k-white.svg"
                    }
                    width={25}
                    height={25}
                />
            </Link>

            <ThemeChanger />
        </Wrapper>
    );
}

const Wrapper = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    padding-top: 2rem;
    padding-bottom: 4rem;

    img {
        cursor: pointer;
    }
`;

const Nav = styled("nav")`
    display: flex;
    align-items: center;

    a {
        text-decoration: none;
        line-height: 1;
        padding: 5px 10px;
        border-radius: 5px;
        font-weight: 600;
        transition: 0.5s;

        &:hover {
            background-color: var(--mode);
        }

        &:first-of-type {
            margin-left: -10px;
        }
    }
`;
