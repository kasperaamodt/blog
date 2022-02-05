import useSWR from "swr";

export default function Analytics() {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR("/api/analytics", fetcher, { refreshInterval: 1000 });

    return <div style={{textAlign: 'center', margin: '10px 0'}}>Current visitors: {data}</div>;
}
