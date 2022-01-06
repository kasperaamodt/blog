import Head from "next/head";
import Image from "next/image";
import { styled } from "goober";
import Header from "../components/header";
import { getPostsForHome } from "../lib/api";
import Link from "next/link";

export default function Home({ posts }) {

    function formatDate(date) {
        const formatted = new Date(date).toLocaleDateString('no-NO', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        });
        return formatted;
    }

    return (
        <>
            <Head>
                <title>Kasper Aamodt</title>
                <meta
                    name="description"
                    content="Kasper Aamodt personal website"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <Main>
                <Intro>
                    <div>
                        <h1>Kasper Aamodt</h1>
                        <h2>Developer at Brainify</h2>
                    </div>
                    <div>
                        <Image alt="Picture of Kasper Aamodt" src="/favicon.ico" height={175} width={175} />
                    </div>
                </Intro>

                <div className="post-grid">
                    {posts.map(({ node }) => {
                        return (
                            <div className="post-card" key={node.slug}>
                                <h3>{node.title}</h3>
                                <span>{formatDate(node.date)}</span>
                                <Link href={`/blog/` + node.slug} passHref><a></a></Link>
                            </div>
                        )
                    })}
                </div>
            </Main>
        </>
    );
};

export async function getStaticProps() {
    const posts = await getPostsForHome();

    return {
        props: { posts: posts.edges },
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;

    .post-grid {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 20px;
    }

    .post-card {
        position: relative;
        padding: 20px;
        background-color: var(--background);

        background-clip: padding-box; /* !importanté */
        border: solid 5px transparent; /* !importanté */
        border-radius: 12px;

        &:before {
            content: '';
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            z-index: -1;
            margin: -5px; /* !importanté */
            border-radius: inherit; /* !importanté */
            background: linear-gradient(to bottom right, rgb(237, 34, 36), rgb(243, 91, 34), rgb(249, 150, 33), rgb(245, 193, 30), rgb(241, 235, 27) 27%, rgb(241, 235, 27), rgb(241, 235, 27) 33%, rgb(99, 199, 32), rgb(12, 155, 73), rgb(33, 135, 141), rgb(57, 84, 165), rgb(97, 55, 155), rgb(147, 40, 142));
        }
    }
`;

const Intro = styled("div")`
    display: grid;
    grid-template-columns: 70% 30%;
`;
