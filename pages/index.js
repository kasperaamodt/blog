import Head from "next/head";
import { styled } from "goober";
import Header from "../components/header";
import Footer from "../components/footer";
import { getPostsForHome } from "../lib/api";
import Link from "next/link";
import PostGrid from "../components/post-grid";
import Button from "../components/button";

export default function Home({ posts }) {
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
                    <h2 style={{ marginBottom: "1rem" }}>Blog</h2>
                    <PostGrid posts={posts} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "1rem" }}>
                    <Button text="View all" link="/blog" />
                </div>
            </Main>

            <Footer />
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

    .post-div {
        margin-top: 4rem;
    }
`;
