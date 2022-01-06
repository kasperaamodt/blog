import { SitemapStream, streamToPromise } from "sitemap";

export default async function sitemap(req, res) {
    try {
        const smStream = new SitemapStream({
            hostname: `https://${req.headers.host}`,
            cacheTime: 600000
        });

        const pages = [{ slug: "" }, { slug: "blog" }];

        // Create each URL row
        pages.forEach((page) => {
            smStream.write({
                url: `/${page.slug}`,
                changefreq: "daily",
                priority: 0.9
            });
        });

        // End sitemap stream
        smStream.end();

        // XML sitemap string
        const sitemapOutput = (await streamToPromise(smStream)).toString();

        // Change headers
        res.writeHead(200, {
            "Content-Type": "application/xml"
        });

        // Display output to user
        res.end(sitemapOutput);
    } catch (e) {
        res.send(JSON.stringify(e));
    }
}
