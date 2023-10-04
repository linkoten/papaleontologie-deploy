'use client'

import { GraphQLClient } from 'graphql-request'
import Link from 'next/link'
import { RichText } from '@graphcms/rich-text-react-renderer'
import Map from '../../components/dynamic'
import Image from 'next/image'
import { useState, useEffect } from 'react';



const hygraph = new GraphQLClient(
  'https://api-eu-west-2.hygraph.com/v2/clkp6kxt31b6x01ta51b202ki/master'
)

const getPost = async params => {
  const { post } = await hygraph.request(
    `query PostPageQuery($slug: String!)  {
      post (where: { slug: $slug }) {
        slug
        title
        date
        tag
        content {
          json
          
        }
        carte {
          latitude
          longitude
        }
        localizations(includeCurrent: true) {
        slug
        title
        date
        tag
        content {
          json

        }
        carte {
          latitude
          longitude
        }
      }
      }
    }`,
    {
      slug: params.slug
    }
  )

  return post
}

const renderers = {
  h1: ({ children }) => (
    <h1 className=' my-2 mb-4 flex items-center justify-center text-3xl font-bold text-third-color  dark:text-sixth-color md:text-4xl lg:text-5xl'>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className=' text-gray-900 my-4 mb-4 flex items-center justify-center text-2xl font-bold text-third-color dark:text-sixth-color md:text-3xl lg:text-4xl'>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className=' my-2 text-2xl font-bold text-third-color  dark:text-sixth-color'>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className=' my-2 text-xl font-bold text-third-color dark:text-sixth-color'>
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className=' my-2 text-xl font-bold text-third-color dark:text-sixth-color'>
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className=' text-large my-2 font-bold text-third-color dark:text-sixth-color'>
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className=' my-4  text-lg text-fifth-color  dark:text-sixth-color'>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className=' my-4  list-inside list-disc text-lg text-fifth-color  dark:text-sixth-color'>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className=' my-4  list-inside list-decimal text-lg text-fifth-color  dark:text-sixth-color'>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className='  my-2  text-lg text-fifth-color dark:text-sixth-color'>
      {children}
    </li>
  ),
  code: ({ children }) => (
    <code className=' dark:bg-gray-800  rounded-md bg-base-300 p-2 text-sm dark:text-sixth-color'>
      {children}
    </code>
  ),
  code_block: ({ children }) => (
    <pre className='dark:bg-gray-800  overflow-y-scroll rounded-md bg-base-300 p-2 text-sm dark:text-sixth-color'>
      {children}
    </pre>
  ),
  a: ({ href }) => (
    <a
      className='link:text-color-primary my-4 text-lg text-link-color underline dark:text-sixth-color'
      href={href}
    >
    </a>
    
  ),
  img: ({ src, title }) => (
    <Image
      width={400}
      height={200}
      src={src}
      className='mx-auto py-2'
      alt={title}
    />
    
  )
}


export default function Posts({ params }) {
  const [post, setPost] = useState(null); // État pour stocker le post
  const [language, setLanguage] = useState('english'); // État pour suivre la langue actuelle

  useEffect(() => {
    async function fetchPost() {
      try {
        const postData = await getPost(params);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [params]);

  if (!post) {
    // Retournez un indicateur de chargement tant que les données ne sont pas chargées
    return <div>Loading...</div>;
  }

  const currentPosts = language === 'english' ? post.localizations[0] : post.localizations[1];

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'french' : 'english');
  };

  return (
    
    
    
    <div className='mx-6 flex flex-col relative z-10 '>

    

<div className=" text-sm breadcrumbs font-extrabold">
  <ul>
    <li><Link href='/'>Home</Link></li> 
    <li><Link href='/blog'>Blog</Link></li> 
    <li>{currentPosts.title}</li>
  </ul>
</div>

    
      <div className='btn btn-outline btn-info mx-6 mb-8'>{currentPosts.tag}</div>

      
      
      <Map markers={currentPosts.carte} />

      <div className='flex justify-end'>
          <button className='btn btn-outline  mx-12 mt-8 sm:btn-lg'
          onClick={toggleLanguage}>
            ({language === 'english' ? 'Version Française' : 'English Version'})
          </button>
          </div>

      <div className=' flex items-center justify-center mt-8 space-x-8 '>
    
      <Link
        className='btn btn-outline btn-primary w-1/3 '
        href='/'
      >
        Home
      </Link>
      <Link
        className='btn btn-outline btn-primary w-1/3 '
        href='/blog'
      >
        Blog

      </Link>
      </div>
      

      <h1 className='mb-4 mt-12 flex items-center justify-center text-3xl font-bold text-third-color dark:text-sixth-color md:text-5xl lg:text-6xl'>
        {currentPosts.title}
      </h1>
      <p className=' text-lg font-bold badge badge-outline'>
        {currentPosts.date}
      </p>
      <RichText content={currentPosts.content.json.children} renderers={renderers} />
    </div>
    
  )
}
