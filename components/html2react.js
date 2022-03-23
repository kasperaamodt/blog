import Link from "next/link";
import Image from "next/image";
import parse, { domToReact } from "html-react-parser";

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

            if (name === "figure" && /wp-block-image/.test(attribs.class)) {
                return <>{domToReact(children, replaceImage)}</>;
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
