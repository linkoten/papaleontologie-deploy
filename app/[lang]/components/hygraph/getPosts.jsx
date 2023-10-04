'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BlogFilter from '../blogFilter' // Assurez-vous que le chemin est correct

export function generateMetadata() {
return { title: 'Posts' }
}

export default function Page({page, posts}) {
const [filter, setFilter] = useState('')
const [language, setLanguage] = useState('english'); // État pour suivre la langue actuelle

const handleFilterChange = newFilter => {
setFilter(newFilter)

}



console.log(posts)

const englishPosts = posts.map((post) => post.localizations[0]);
const frenchPosts = posts.map((post) => post.localizations[1]);
const currentPosts = language === 'english' ? englishPosts : frenchPosts;

const filteredPosts = filter
? currentPosts.filter(post => post.tag === filter)
: currentPosts

console.log(currentPosts)
const toggleLanguage = () => {
setLanguage(language === 'english' ? 'french' : 'english');
};


  return (
    <>
      <div className='breadcrumbs  mx-5 text-sm font-extrabold'>
        <ul>
          <li>
            <Link href='/'>{page.blog.breadCrumbs1}</Link>
          </li>
          <li>Blog</li>
        </ul>
      </div>
      <div className='h-full py-12'>
        <div className='container'>
          <h1 className='text-2xl font-semibold '>Articles</h1>
          <div className='flex justify-end'>
          <button className='btn btn-outline  mx-12 my-8 sm:btn-lg'
          onClick={toggleLanguage}>
            ({language === 'english' ? 'Version Française' : 'English Version'})
          </button>
          </div>
          <BlogFilter page= {page}
            options={['Salon', 'Collection', 'Fouille', 'Gisement']}
            initialFilter={filter}
            onFilterChange={handleFilterChange}
          />
          <div className='mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8'>
            {filteredPosts.map(
              ({ slug, date, id, title, coverImage, tag, excerpt }) => (
                <div
                  key={id}
                  className='card w-48 bg-base-200 shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-base-300 xl:w-72 '
                >
                  <Link key={id} href={`/blog/${slug}`}>
                    <div className='bg-stone-300 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7'>
                      {coverImage && (
                        <div>
                          {coverImage.url && (
                            <Image
                              src={coverImage.url}
                              alt={title}
                              width={coverImage.width}
                              height={coverImage.height}
                              priority={true}
                              className='h-full w-full object-cover object-center transition-opacity group-hover:opacity-75'
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <div className='card-body'>
                      <h2 className='card-title'>{title}</h2>
                      <p className=' text-xs'>{excerpt}</p>
                      <div className='card-actions items-end justify-end'>
                        <div className='badge badge-outline'>{tag}</div>
                        <div className='badge badge-outline'>{date}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
