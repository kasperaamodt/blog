export default async function handler(req, res) {
    const result = await fetch(
        "https://analytics.brainify.no/api/v1/stats/realtime/visitors?site_id=aamodt.xyz",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.PLAUSIBLE_API}`
            }
        }
    );
    const data = await result.json();

    if (!result.ok) {
        return res.status(500).json({ error: "Error retrieving data" });
    }

    return res.status(200).json(data);
}
