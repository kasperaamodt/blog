export function formatDate(date) {
    const formatted = new Date(date).toLocaleDateString("no-NO", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    });
    return formatted;
}
