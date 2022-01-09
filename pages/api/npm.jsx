export async function npmStats() {
    const today = new Date().toLocaleDateString("fr-CA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    const res = await fetch(`https://npm-stat.com/api/download-counts?author=kasperaamodt&from=2021-01-01&until=${today}`, {
        method: 'GET',
        redirect: 'follow'
    });
    var data = await res.json();
    var count = 0;
    for(var i in data) {
        for(var val in data[i]) {
            count = count + (data[i][val]);
        }
    }
    const resJson = {
        downloads: count
    }
    return resJson;
}

export default async function npmDownloads(req, res) {
    const data = await npmStats();
    res.status(200).json(data);
}