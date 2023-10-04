import { GraphQLClient } from 'graphql-request'

const hygraph = new GraphQLClient(
    'https://api-eu-west-2.hygraph.com/v2/clkp6kxt31b6x01ta51b202ki/master'
  )


export const submitComment = async (obj) => {
    const result = await hygraph.request('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  
    return result.json();
  };
  
  export const getComments = async (slug) => {
    const query = gql`
      query GetComments($slug:String!) {
        comments(where: {post: {slug:$slug}}){
          name
          createdAt
          comment
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.comments;
  };