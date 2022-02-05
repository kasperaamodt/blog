export default async function handler(req, res) {
    const result = await fetch(
        "https://analytics.brainify.no/api/v1/stats/realtime/visitors?site_id=aamodt.xyz",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer BIkrSeOydFyecyEVueT4W7QZIoYaACBd2isaDTe4tb2b7NZDCjUoqr9odqt343Ww`
            }
        }
    );
    const data = await result.json();

    if (!result.ok) {
        return res.status(500).json({ error: "Error retrieving data" });
    }

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=1200, stale-while-revalidate=600"
    );

    return res.status(200).json(data);
}
