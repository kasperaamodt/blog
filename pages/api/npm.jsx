async function npmDownloads() {
    const res = await fetch("https://npm-stat.com/api/download-counts?author=kasperaamodt&from=2021-01-01&until=2022-01-08", {
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

export default async function Downloads(req, res) {
    const data = await npmDownloads();
    res.status(200).json(data);
}