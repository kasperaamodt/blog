export default async function fetcher(...args) {
    fetch(...args).then((res) => res.json());
}
