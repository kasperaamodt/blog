import Head from "next/head";
import ErrorPage from 'next/error';
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
                        <title>
                            {blog.title}
                        </title>
                        <meta
                            content={blog.excerpt}
                            name="description"
                        />
                    </Head>

                    <Header />

                    <Main>
                        <h1>{blog.title}</h1>
                        <span>{formatDate(blog.date)}</span>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
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
            blog: data.post,
        },
    };
}

export async function getStaticPaths() {
    const allPosts = await getAllPostSlugs();

    return {
        paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
        fallback: true,
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;

    * {
        margin: 12px 0;
        font-family: Georgia, serif;
    }

    .wp-block-code {
        border: 1px solid;
        border-radius: 5px;
        font-family: Menlo, Consolas, monaco, monospace;
        padding: 0.8em 1em;
    }
`;

const Spacer = styled("div")`
    height: 2rem;
`;