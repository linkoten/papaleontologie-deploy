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
            
            <div className=' text-sixth-color bold'>
            Papaleontologie
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}