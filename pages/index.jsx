import Head from "next/head";
import Image from "next/image";
import { styled } from "goober";
import Header from "../components/header";
import { getPostsForHome } from "../lib/api";
import Link from "next/link";
import { formatDate } from "../utils/functions";

export default function Home({ posts }) {
    return (
        <>
            <Head>
                <title>Kasper Aamodt - Founder, Developer, writer.</title>
                <meta
                    name="description"
                    content="Founder, developer and writer."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <Main>
                <Intro>
                    <div>
                        <h1>Kasper Aamodt</h1>
                        <h2>Developer at Brainify</h2>
                        <p>Blogging about stuff, mostly tech.</p>
                    </div>
                    <div>
                        <Image
                            alt="Picture of Kasper Aamodt"
                            src="/images/me.jpg"
                            height={939}
                            width={939}
                        />
                    </div>
                </Intro>

                <div className="post-grid">
                    {posts.map(({ node }) => {
                        return (
                            <div className="post-card" key={node.slug}>
                                <h3>{node.title}</h3>
                                <span>{formatDate(node.date)}</span>
                                <Link href={`/blog/` + node.slug} passHref>
                                    <a></a>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </Main>
        </>
    );
}

export async function getStaticProps() {
    const posts = await getPostsForHome();

    return {
        props: { posts: posts.edges }
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;

    .post-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin: 80px 0;
    }

    .post-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        position: relative;
        padding: 20px;
        background-color: var(--background);
        background-clip: padding-box;
        border: solid 5px transparent;
        border-radius: 12px;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            margin: -5px;
            border-radius: inherit;
            background: linear-gradient(
                to bottom right,
                rgb(237, 34, 36),
                rgb(243, 91, 34),
                rgb(249, 150, 33),
                rgb(245, 193, 30),
                rgb(241, 235, 27) 27%,
                rgb(241, 235, 27),
                rgb(241, 235, 27) 33%,
                rgb(99, 199, 32),
                rgb(12, 155, 73),
                rgb(33, 135, 141),
                rgb(57, 84, 165),
                rgb(97, 55, 155),
                rgb(147, 40, 142)
            );
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

        h3 {
            margin-bottom: 20px;
        }
    }
`;

const Intro = styled("div")`
    display: grid;
    grid-template-columns: 70% 30%;

    h1,
    h2 {
        line-height: 1;
        margin-bottom: 10px;
    }

    img {
        border-radius: 50%;
        height: 175px;
        width: 175px;
    }
`;
