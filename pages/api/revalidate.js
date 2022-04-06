export default async function handler(req, res) {
    if (req.query.secret !== process.env.REVALIDATE) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const slug = undefined;

    if (req.query.slug) {
        slug = req.queryl.slug
    }

    console.log(req);

    try {
        await res.unstable_revalidate("/");
        await res.unstable_revalidate("/blog");
        await res.unstable_revalidate(`/blog/${slug}`);
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send("Error revalidating");
    }
}
