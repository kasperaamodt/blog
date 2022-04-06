import { styled } from "goober";

export default function Disclaimer({children}) {
    return (
        <>
            <Container>
                {children}
            </Container>
        </>
    );
}

const Container = styled("div")`
    border-radius: 15px;
    background: rgba(243, 32, 19, 0.75);
    backdrop-filter: blur(4px);
    padding: 2rem;

    p {
        margin: 0;
        color: #fff;
    }
`;
