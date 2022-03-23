import Head from "next/head";
import { styled } from "goober";
import Header from "../components/header";
import Footer from "../components/footer";
import { getPostByYear, getPostsForHome } from "../lib/api";
import Link from "next/link";
import PostGrid from "../components/post-grid";
import { formatDate } from "@utils/functions";

export default function Home({ posts, y2022, y2021, y1999 }) {
    return (
        <>
            <Head>
                <title>Kasper Aamodt - Founder, Developer, writer.</title>
                <meta
                    name="description"
                    content="Founder, developer and writer."
                />
            </Head>

            <Header />

            <Main>
                <div>
                    <h1>
                        <a
                            href="https://twitter.com/kasperaamodt"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Kasper Aamodt
                        </a>
                    </h1>
                    <h2 style={{ marginBottom: "5px" }}>
                        Developer at{" "}
                        <a
                            href="https://brainify.no"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Brainify
                        </a>
                        &nbsp;&{" "}
                        <a
                            href="https://aamodtgroup.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            AG
                        </a>
                    </h2>
                    <p>Blogging about stuff, mostly tech.</p>
                </div>

                <div className="post-div">
                    <h2 style={{ marginBottom: "1rem" }}>Featured posts</h2>
                    <PostGrid posts={posts} />
                </div>

                <h2 style={{ margin: "4rem 0 2rem 0" }}>All posts</h2>
                <Years>
                    <h3>2022</h3>
                    {y2022?.map(({ node }) => {
                        return (
                            <div className="post-card" key={node.slug}>
                                <h2> {node.title}</h2>
                                <span>{formatDate(node.date)}</span>
                                <Link href={`/blog/` + node.slug} passHref>
                                    <a aria-label={node.title}></a>
                                </Link>
                            </div>
                        );
                    })}
                </Years>
                <Years>
                    <h3>2021</h3>
                    {y2021?.map(({ node }) => {
                        return (
                            <div className="post-card" key={node.slug}>
                                <h2> {node.title}</h2>
                                <span>{formatDate(node.date)}</span>
                                <Link href={`/blog/` + node.slug} passHref>
                                    <a aria-label={node.title}></a>
                                </Link>
                            </div>
                        );
                    })}
                </Years>
                <Years>
                    <h3>1999</h3>
                    {y1999?.map(({ node }) => {
                        return (
                            <div className="post-card" key={node.slug}>
                                <h2> {node.title}</h2>
                                <span>{formatDate(node.date)}</span>
                                <Link href={`/blog/` + node.slug} passHref>
                                    <a aria-label={node.title}></a>
                                </Link>
                            </div>
                        );
                    })}
                </Years>
            </Main>

            <Footer />
        </>
    );
}

export async function getStaticProps() {
    const posts = await getPostsForHome();
    const y1999 = await getPostByYear(1999);
    const y2021 = await getPostByYear(2021);
    const y2022 = await getPostByYear(2022);

    return {
        props: {
            posts: posts.edges,
            y1999: y1999.edges,
            y2021: y2021.edges,
            y2022: y2022.edges
        }
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;

    .post-div {
        margin-top: 4rem;
    }
`;

const Years = styled("div")`
    margin: 2rem 0;
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
