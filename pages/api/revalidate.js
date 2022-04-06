export default async function handler(req, res) {
    if (req.query.secret !== process.env.REVALIDATE) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        const body = req.body;
        if (!body) {
            res.status(400).send("Bad request, no body");
        }
        const slug = body.slug;
        await res.unstable_revalidate("/");
        await res.unstable_revalidate("/blog");
        if (slug) {
            await res.unstable_revalidate(`/blog/${slug}`);
            return res.json({ revalidated: true });
        } else {
            return res.json({ revalidated: true, slug: false });
        }
        
    } catch (err) {
        return res.status(500).send("Error revalidating");
    }
}
