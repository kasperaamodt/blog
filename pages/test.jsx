import Head from "next/head";
import { styled } from "goober";
import Header from "../components/header";
import { npmData } from "../lib/api";
import Link from "next/link";
import { formatDate } from "../utils/functions";

export default function Test({ data }) {
    var count = 0;
    
    for(var i in data) {
        for(var val in data [i]) {
            count = count + (data [i] [val]);
        }
    }

    console.log(count);

    return (
        <>
            <Head>
                <title>Test - Kasper Aamodt</title>
            </Head>

            <Header />

            <Main>
                <h1>NPM total downloads</h1>
                <span>{count}</span>
            </Main>
        </>
    );
}

export async function getStaticProps() {
    const data = await npmData();

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
