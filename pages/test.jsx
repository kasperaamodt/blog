import Head from "next/head";
import { styled } from "goober";
import Header from "../components/header";
import { npmStats } from "./api/npm";

export default function Test({ data }) {
    return (
        <>
            <Head>
                <title>Test - Kasper Aamodt</title>
            </Head>

            <Header />

            <Main>
                <h1>NPM total downloads</h1>
                <div>{data.downloads}</div>
            </Main>
        </>
    );
}

export async function getServerSideProps() {
    const data = await npmStats();

    return {
        props: { data }
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;

    .post-card {
        position: relative;
        border-bottom: 1px solid;
        padding: 24px 0;

        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;

        &:last-of-type {
            border-bottom: none;
        }

        h2 {
            font-size: 1rem;
        }

        a {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            opacity: 0;
            height: 100%;
            width: 100%;
            text-decoration: none;
        }
    }
`;
