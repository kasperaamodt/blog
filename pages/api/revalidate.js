export default async function handler(req, res) {
    if (req.query.secret !== process.env.REVALIDATE) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        const body = req.body;
        if (!body) {
            res.status(400).send("Bad request, no body");
        }
        const slugToReval = body.slug;
        await res.unstable_revalidate("/");
        await res.unstable_revalidate("/blog");
        if (slugToReval) {
            await res.unstable_revalidate(`/blog/${slugToReval}`);
            return res.json({ revalidated: true, revalidatedSlug: slugToReval });
        } else {
            return res.json({ revalidated: true, slug: false });
        }
        
    } catch (err) {
        return res.status(500).send("Error revalidating");
    }
}
