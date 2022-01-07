import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { getAllPostSlugs, getPostAndMorePosts } from "../../lib/api";
import { styled } from "goober";
import Header from "../../components/header";
import { formatDate, metaDescription, removeTags } from "../../utils/functions";

export default function Blog({ blog }) {
    const router = useRouter();

    if (!router.isFallback && !blog?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    function makeExcerpt(desc) {
        var excerpt = removeTags(desc);
        excerpt = metaDescription(excerpt);
        return excerpt;
    }

    return (
        <>
            {router.isFallback ? (
                <span>Loading…</span>
            ) : (
                <>
                    <Head>
                        <title>{blog.title} - Kasper Aamodt</title>
                        <meta content={makeExcerpt(blog.excerpt)} name="description" />
                    </Head>

                    <Header />

                    <Main>
                        <span>{formatDate(blog.date)}</span>
                        <h1 style={{ marginTop: "0px" }}>{blog.title}</h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                            style={{ marginBottom: "0px" }}
                        />
                    </Main>
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
    padding-bottom: 2rem;

    * {
        margin: 24px 0;
        font-family: Georgia, serif;
    }

    p {
        font-size: 21px;

        &:last-of-type {
            margin-bottom: 0;
        }
    }

    h1 {
        font-size: 48px;
        line-height: 1.2;
    }

    h2 {
        font-size: 30px;
    }

    figure {
        margin: 0;
    }

    img {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }

    pre {
        position: relative;
        padding: 0.8rem 1rem;
        background-color: var(--background);
        background-clip: padding-box;
        border: solid 2px transparent;
        border-radius: 5px;
        font-family: Menlo, Consolas, monaco, monospace;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            margin: -2px;
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

        code {
            display: inline-block;
            max-width: 100%;
            word-break: break-all;
            word-wrap: break-word;
            margin: 0;

            @media (max-width: 568px) {
                white-space: normal;
            }
        }
    }
`;
