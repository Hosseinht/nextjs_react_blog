import {request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges;
};


export const getPostDetails = async (slug) => {
    const query = gql`
        # we are accepting a slug that will be a string
        query GetPostDetails($slug: String!) {
            post(where: {slug: $slug}){
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                    url
                }
                content {
                    raw
                }
                categories {
                    name
                    slug
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});
    return result.post;
};


export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails {
            posts(
                orderBy: createdAt_ASC
                last:3
            ) {
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }


    `
    const result = await request(graphqlAPI, query);
    return result.posts;
}


export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug:String!, $categories:[String!]) {
            posts(
                # slug_not because we want to show the related posts not the current slug because current slug is the post that we are looking at right now
                where: {slug_not: $slug, AND:{categories_some: {slug_in: $categories}}}
                # don't display the current article but display other articles that include some of the categories
                last: 3
            ) {
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }

        }

    `
    const result = await request(graphqlAPI, query, {categories, slug});
    return result.posts;
}


export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);
    return result.categories;
}