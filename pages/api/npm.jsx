async function npmData() {
    var res = await fetch("https://npm-stat.com/api/download-counts?author=kasperaamodt&from=2021-01-01&until=2022-01-08", {
        method: 'GET',
        redirect: 'follow'
    });
    data = res.json();
    var count = 0;
    for(var i in data) {
        for(var val in data [i]) {
            count = count + (data [i] [val]);
        }
    }
    return count;
}

module.exports = (req, res) => {
    res.json(npmData);
}