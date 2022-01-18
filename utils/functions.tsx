export function formatDate(date: string) {
    const formatted = new Date(date).toLocaleDateString("no-NO", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    });
    return formatted;
}

export function metaDescription(str: string) {
    return str.replace(/^(.{135}[^\s]*).*/, "$1").trim() + "...";
}

export function removeTags(str: string) {
    return str.toString().replace(/(<([^>]+)>)/gi, "");
}

export function metaFormat(str: string) {
    return str.replace(/ /g, "+");
}
