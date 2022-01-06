import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { getAllPostSlugs, getPostAndMorePosts } from "../../lib/api";
import { styled } from "goober";
import Header from "../../components/header";
import { formatDate } from "../../utils/functions";

export default function Blog({ blog }) {
    const router = useRouter();

    if (!router.isFallback && !blog?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <>
            {router.isFallback ? (
                <span>Loading…</span>
            ) : (
                <>
                    <Head>
                        <title>{blog.title} - Kasper Aamodt</title>
                        <meta content={blog.excerpt} name="description" />
                    </Head>

                    <Header />

                    <Main>
                        <span>{formatDate(blog.date)}</span>
                        <h1>{blog.title}</h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </Main>
                    <Spacer />
                </>
            )}
        </>
    );
}

export async function getStaticProps({ params }) {
    const data = await getPostAndMorePosts(params.slug);

    return {
        props: {
            blog: data.post
        }
    };
}

export async function getStaticPaths() {
    const allPosts = await getAllPostSlugs();

    return {
        paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
        fallback: true
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    padding: 0 15px;

    h2, h3, h4, p, a, img, pre {
        margin-top: 42px;
        font-family: Georgia, serif;
    }

    p {
        font-size: 21px;
    }

    h2, h3, h4 {
        margin-bottom: -32px;
    }

    h1 {
        font-size: 48px;
        line-height: 1.2;
    }

    h2 {
        font-size: 30px;
    }

    pre {
        border: 1px solid;
        border-radius: 5px;
        font-family: Menlo, Consolas, monaco, monospace;
        padding: 0.8em 1em;
    }
`;

const Spacer = styled("div")`
    height: 2rem;
`;
