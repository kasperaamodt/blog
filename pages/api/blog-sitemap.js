import { SitemapStream, streamToPromise } from "sitemap";

export default async function blogSitemap(req, res) {
    try {
        const smStream = new SitemapStream({
            hostname: `https://${req.headers.host}`,
            cacheTime: 600000
        });

        const blogs = [
            { slug: "hello-world" },
            { slug: "accessibility-for-all" },
            { slug: "the-flexibility-of-wordpress" },
            { slug: "deploying-frontity-to-vercel-with-github" },
            { slug: "vercel-ignore-github-branches" },
            {
                slug: "frontity-gravity-forms-package-and-why-i-love-to-make-packages"
            }
        ];

        // Create each URL row
        blogs.forEach((blog) => {
            smStream.write({
                url: `/blog/${blog.slug}`,
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
