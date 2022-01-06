import { styled } from "goober";
//import ThemeChanger from "./theme";
import Link from "next/link";

export default function Header() {
    return (
        <Wrapper>
            <Nav>
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
            </Nav>
            {/* <ThemeChanger /> */}
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
`;

const Nav = styled("nav")`
    display: flex;
    gap: 10px;

    a {
        text-decoration: none;
    }
`;
