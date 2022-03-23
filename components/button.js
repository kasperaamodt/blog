import { styled } from "goober";
import Link from "next/link";

export default function Button({ text, link }) {
    return (
        <>
            <Link href={link} passHref>
                <ButtonStyle>{text}</ButtonStyle>
            </Link>
        </>
    );
}

const ButtonStyle = styled("div")`
    width: auto;
    padding: 5px 15px;
    font-size: 16px;
    position: relative;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    cursor: pointer;
`;
