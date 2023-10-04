import { getDictionary } from '../dictionaries'
import GetPosts from '../components/hygraph/getPosts'
import { GraphQLClient } from 'graphql-request'



const getPosts = async () => {
  const hygraph = new GraphQLClient(
    'https://api-eu-west-2.hygraph.com/v2/clkp6kxt31b6x01ta51b202ki/master'
  )

  const { posts } = await hygraph.request(
    `{
      posts (locales: [en, fr]) {
        localizations(includeCurrent: true) {
          title
          slug
          date
          excerpt
          id
          tag
          coverImage {
            id
            locale
            height
            size
            width
            url
          }
        }
      }
    }`
  )

  return posts
}

export default async function Page({
  params: { lang }

  
}) {
  const {page } = await getDictionary(lang);
  const posts = await getPosts()
  return(
    <div>
      <GetPosts page = {page} posts = {posts} />
    </div>
  )
}
