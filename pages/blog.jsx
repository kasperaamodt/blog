import Head from "next/head";
import { styled } from "goober";
import Header from "../components/header";
import { getAllPosts } from "../lib/api";
import Link from "next/link";

export default function Blog({ posts }) {
    return (
        <>
            <Head>
                <title>Blog | Aamodt Group | Articles and news</title>
                <meta
                    content="Read the latest articles and news about what we do day to day, and also important updates"
                    name="description"
                />
            </Head>

            <Header />

            <Main>
                {posts.map(({ node }) => {
                    return (
                        <div key={node.slug}>
                            <Link href={`/blog/` + node.slug}>{node.title}</Link>
                        </div>
                    )
                })}
            </Main>

        </>
    );
}

export async function getStaticProps() {
    const allPosts = await getAllPosts();

    return {
        props: { posts: allPosts.edges },
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;
`;
