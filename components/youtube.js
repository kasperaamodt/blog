import { styled } from "goober";

export default function YouTube({ src }) {
    return (
        <Video>
            <iframe
                width="853"
                height="480"
                src={src}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </Video>
    );
}

const Video = styled("div")`
    overflow: hidden;
    border-radius: 10px;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;

    iframe {
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        margin: 0;
    }
`;
