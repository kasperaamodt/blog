import { styled } from "goober";
import Link from "next/link";

export default function Button({ text, link }) {
    return (
        <>
            <p style={{ display: "none", visibility: "hidden", opacity: "0" }}>
                Cool button? Found it here: https://ui.gallery/
            </p>
            <Link href={link} passHref>
                <ButtonStyle>{text}</ButtonStyle>
            </Link>
        </>
    );
}

const ButtonStyle = styled("div")`
    width: auto;
    font-family: MS Sans Serif;
    padding: 12px 24px;
    font-size: 16px;
    position: relative;
    font-weight: 500;
    transition: box-shadow 150ms ease, color 150ms ease, background 150ms ease,
        transform 150ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #c6c6c6;
    color: #0a0a0a;
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        left: 2px;
        top: 2px;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        outline: rgb(10, 10, 10) solid 2px;
        border-style: solid;
        border-width: 2px;
        border-color: rgb(254, 254, 254) rgb(10, 10, 10) rgb(10, 10, 10)
            rgb(254, 254, 254);
        box-shadow: rgb(223 223 223) 1px 1px 0px 1px inset,
            rgb(132 133 132) -1px -1px 0px 1px inset;
    }

    &:active:before {
        border-style: solid;
        border-width: 2px;
        border-color: rgb(10, 10, 10) rgb(254, 254, 254) rgb(254, 254, 254)
            rgb(10, 10, 10);
        box-shadow: rgb(132 133 132) 1px 1px 0px 1px inset,
            rgb(223 223 223) -1px -1px 0px 1px inset;
    }

    &:after {
        content: "";
        position: absolute;
        display: block;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
    }

    &:active:after {
        outline: rgb(10, 10, 10) dotted 2px;
        outline-offset: -8px;
        top: 1px;
    }
`;
