const API_URL = "https://wp.aamodt.xyz/graphql";

async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json = await res.json();
    return json.data;
}

export async function sendForm(name, email, select, message) {
    const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            apikey: API_KEY,
            name: name,
            email: email,
            mood: select,
            message: message,
        }),
    });
    return res?.json();
}


export async function getAllPostSlugs() {
    const data = await fetchAPI(`
    {
      posts(first: 10000) {
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
    const data = await fetchAPI(
        `
        query allPosts {
            posts(first: 20) {
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
                    }
                }
            }
        }
    `
    );
    return data?.posts;
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
            }
        }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
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
    return data;
}