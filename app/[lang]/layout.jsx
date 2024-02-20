import { ClerkProvider } from '@clerk/nextjs/app-beta'
import Footer from './components/layout/footer'
import Header from './components/layout/header'
import { Inter } from 'next/font/google'
import './globals.css'
import { getDictionary } from './dictionaries'
import { cache } from 'react'


export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export const dynamic = 'force-static'

const inter = Inter({
  subsets: ['latin']
})

export const metadata = {
  title: 'Paleolitho',
  description: 'A Fossil E-Commerce Website where you will find Rare and Uniques Fossils from Morroco and France, especially Trilobites and Shells.'
}

export default cache(async function RootLayout({ children, params }) {
  const { lang } = params;
  const {layout } = await getDictionary(lang);

  return (
    <html
      lang={params.lang}
      className={`${inter.className} h-full scroll-smooth antialiased`}
    >
      <body className='text-stone-700 flex h-full flex-col'>
        <ClerkProvider>
          <Header  layout = {layout}/>
          <main className='grow' data-theme='corporate'>
            {children}
          </main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
})
