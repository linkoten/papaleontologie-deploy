import Image from 'next/image'
import heroImage from '@/public/images/hero1.png'
import Link from 'next/link'
import { getDictionary } from './dictionaries';



export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export default async function Page({ params: { lang }}) {
  const { page } = await getDictionary(lang);
  return(
    
    <section className='h-full'>
      <div className='relative isolate h-full overflow-hidden pt-14'>
        <Image
          alt=''
          src={heroImage}
          className='fixed inset-0 -z-10 h-full w-full object-cover'
        />

        <div
          aria-hidden='true'
          className='fixed inset-0 -z-10 bg-fifth-color/70 bg-blend-multiply'
        />

        <div className='mx-auto max-w-2xl py-32 px-4 sm:py-48 md:px-6 lg:py-56 xl:px-8'>
          
          <div className='text-center'>
            
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                href='/products'
                className='rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-sixth-color shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400'
              >
                {page.home.shop}
              </Link>
              <Link
                href='/blog'
                className='text-sm font-semibold leading-6 text-sixth-color'
              >
                {page.home.blog} <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}