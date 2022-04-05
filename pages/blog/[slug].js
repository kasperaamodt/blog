import Head from "next/head";
import Image from "next/image";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { getAllPostSlugs, getPostAndMorePosts } from "@lib/api";
import { styled } from "goober";
import Html2react from "@components/html2react";
import Header from "@components/header";
import Footer from "@components/footer";
import { formatDate, metaDescription, removeTags } from "@utils/functions";
import PostGrid from "@components/post-grid";
import Button from "@components/button";

export default function Blog({ blog, blogs }) {
    const router = useRouter();
    blogs = blogs?.edges;

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
                        <meta
                            content={makeExcerpt(blog.excerpt)}
                            name="description"
                        />
                        <meta
                            property="twitter:image"
                            content={
                                blog.seo.twitterImage
                                    ? blog.seo.twitterImage.mediaItemUrl
                                    : null
                            }
                        />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                        <meta
                            name="twitter:title"
                            content={blog.title + " - Kasper Aamodt"}
                        />
                    </Head>

                    <Header />

                    <Main>
                        <span style={{ fontWeight: "500" }}>
                            {formatDate(blog.date)}
                        </span>
                        <h1 style={{ marginTop: "0px" }}>{blog.title}</h1>
                        {blog.featuredImage && (
                            <Image
                                src={blog.featuredImage.node.sourceUrl}
                                height={
                                    blog.featuredImage.node.mediaDetails.height
                                }
                                width={
                                    blog.featuredImage.node.mediaDetails.width
                                }
                                alt="Hero image"
                                priority
                            />
                        )}
                        <div style={{ marginBottom: "0px" }}>
                            <Html2react html={blog.content} />
                        </div>
                    </Main>
                    <Related>
                        <h2 style={{ marginBottom: "1rem" }}>More to read</h2>
                        <PostGrid posts={blogs} />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "2rem 0 1rem 0"
                            }}
                        >
                            <Button text="View all" link="/blog" />
                        </div>
                    </Related>
                </>
            )}
        </>
    );
}

export async function getStaticProps({ params }) {
    const data = await getPostAndMorePosts(params.slug);

    return {
        props: {
            blog: data.post,
            blogs: data.posts
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
    max-width: 700px;
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
        transition: background 0.5s;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        font-family: Menlo, Consolas, monaco, monospace;

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

const Related = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;
`;
