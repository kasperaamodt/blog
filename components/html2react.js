import parse, { domToReact } from "html-react-parser";
import Link from "next/link";
import Image from "next/image";
import YouTube from "./youtube";

export default function Html2react({ html } = html) {
    const content = {
        replace: ({ name, attribs, children }) => {
            if (name === "a") {
                return (
                    <Link href={attribs.href} passHref>
                        <a target={attribs.target} rel={attribs.rel}>
                            {domToReact(children)}
                        </a>
                    </Link>
                );
            }

            if (name === "figure" && /wp-block-embed-youtube/.test(attribs.class)) {
                return <>{domToReact(children, content)}</>;
            }

            if (name === "div" && /wp-block-embed__wrapper/.test(attribs.class)) {
                return <>{domToReact(children, content)}</>;
            }

            if (name === "iframe" && /youtube.com\/embed/.test(attribs.src)) {
                return <YouTube src={attribs.src} />
            }

            if (name === "figure" && /wp-block-image/.test(attribs.class)) {
                return <>{domToReact(children, content)}</>;
            }

            if (name === "img") {
                return (
                    <Image
                        src={attribs.src}
                        width={attribs.width}
                        height={attribs.height}
                        alt={
                            attribs.alt
                                ? attribs.alt
                                : "Image - this image does not have an alt text, please let me know."
                        }
                    />
                );
            }
        }
    };

    return parse(html, content);
}
