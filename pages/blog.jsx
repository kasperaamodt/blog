import Head from "next/head";
import { styled } from "goober";
import Header from "../components/header";
import { getAllPosts } from "../lib/api";
import Link from "next/link";
import { formatDate } from "../utils/functions";

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
                        <div className="post-card" key={node.slug}>
                            <h2> {node.title}</h2>
                            <span>{formatDate(node.date)}</span>
                            <Link href={`/blog/` + node.slug} passHref><a></a></Link>
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

    .post-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

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
