const API_URL = "https://wp.aamodt.xyz/graphql";

async function fetchAPI(query, { variables } = {}) {
    const headers = { "Content-Type": "application/json" };

    const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    });

    const json = await res.json();
    return json.data;
}

export async function getAllPostSlugs() {
    const data = await fetchAPI(`
    {
        posts(first: 1000) {
            edges {
                node {
                    slug
                }
            }
        }
    }
    `);
    return data?.posts;
}

export async function getPostsForHome() {
    const data = await fetchAPI(`
    {
        posts(first: 3) {
            edges {
                node {
                    title
                    slug
                    date
                }
            }
        }
    }
    `);
    return data?.posts;
}

export async function getAllPosts() {
    const data = await fetchAPI(`
    {
        posts(first: 1000) {
            edges {
                node {
                    title
                    excerpt
                    slug
                    date
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                    categories {
                        nodes {
                            name
                            slug
                        }
                    }
                }
            }
        }
    }
    `);
    return data?.posts.edges;
}

export async function getPostAndMorePosts(slug) {
    const data = await fetchAPI(
        `
    fragment PostFields on Post {
        title
        excerpt
        slug
        date
        featuredImage {
            node {
                sourceUrl
                mediaDetails {
                    height
                    width
                }
            }
        }
        seo {
            twitterImage {
                mediaItemUrl
            }
        }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
            ...PostFields
            content
        }
        posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
                node {
                    ...PostFields
                }
            }
        }
    }
    `,
        {
            variables: {
                id: slug,
                idType: "SLUG"
            }
        }
    );
    data.posts.edges = data.posts.edges.filter(
        ({ node }) => node.slug !== slug
    );
    if (data.posts.edges.length > 3) data.posts.edges.pop();

    return data;
}

export async function getAllCategories() {
    const data = await fetchAPI(`
    query AllCategories {
        categories(where: {hideEmpty: true, exclude: ["1"]}) {
            edges {
                node {
                    name
                    slug
                    categoryId
                }
            }
        }
    }
    `);

    return data?.categories.edges;
}

export async function getCategoryBySlug(slug) {
    const data = await fetchAPI(
        `
        query Category($id: ID!, $idType: CategoryIdType!) {
            category(id: $id, idType: $idType) {
                categoryId
                name
                slug
            }
        }
    `,
        {
            variables: {
                id: slug,
                idType: 'SLUG',
            },
        }
    );

    return data?.category
}

export async function getAllPostsByCategory(categoryId) {
    const data = await fetchAPI(
        `
    query allPostsByTag($categoryId: Int!) {
        posts(where: {categoryId: $categoryId}) {
            edges {
                node {
                    date
                    title
                    slug
                    featuredImage {
                        node {
                            sourceUrl
                            mediaDetails {
                                height
                                width
                            }
                        }
                    }
                    categories {
                        nodes {
                            name
                            slug
                        }
                    }
                }
            }
        }
    }`,
        {
            variables: {
                categoryId: categoryId,
            },
        }
    );
    
    return data?.posts.edges
}
