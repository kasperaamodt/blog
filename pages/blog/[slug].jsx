import Head from "next/head";
import { useRouter } from "next/router";
import { getAllPostSlugs, getPostAndMorePosts } from "../../lib/api";
import { styled } from "goober";
import Header from "../../components/header";

export default function Blog({ blog }) {
    const router = useRouter();
    const date = new Date(blog?.date).toLocaleDateString('no-NO', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    if (!router.isFallback && !blog?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <>
            {router.isFallback ? (
                <PostTitle>Loading…</PostTitle>
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
                        <p>{date}</p>
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
`;