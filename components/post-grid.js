import { styled } from "goober";
import Link from "next/link";
import Html2react from "@components/html2react";
import { removeTags, metaDescription } from "@utils/functions";

export default function PostGrid({ posts }) {
    function makeExcerpt(desc) {
        var excerpt = removeTags(desc);
        excerpt = metaDescription(excerpt);
        return excerpt;
    }
    return (
        <Grid>
            {posts.map(({ node }) => {
                return (
                    <div className="featured-card" key={node.slug}>
                        <h3>{node.title}</h3>
                        <span>
                            <Html2react html={makeExcerpt(node.excerpt)} />
                        </span>
                        <Link href={`/blog/` + node.slug} passHref>
                            <a aria-label={node.title}></a>
                        </Link>
                    </div>
                );
            })}
        </Grid>
    );
}

const Grid = styled("div")`
    display: grid;
    grid-template-columns: 100%;
    gap: 2rem;

    .featured-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: background 0.5s;
        position: relative;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

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

        h3 {
            margin-bottom: 20px;
        }
    }
`;
