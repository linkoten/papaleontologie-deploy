'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSWRConfig } from 'swr'

import clsx from 'clsx'

import { Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { formatCurrency } from '@/lib/utils'
import { addToCart } from '@/lib/swell/cart'
import { Blinker } from '../components/ui/loading'
import Link from 'next/link'


const Product = ({ frenchProduct, englishProduct, page }) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(frenchProduct)
  const [currentLanguage, setCurrentLanguage] = useState('fr'); // État pour suivre la langue actuelle


  const toggleLanguage = () => {
    // Toggle entre 'fr' et 'en' en fonction de la valeur actuelle de currentLanguage
    const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    setCurrentLanguage(newLanguage);
  };

  useEffect(() => {
    // Mettre à jour product en fonction de la langue actuelle
    if (currentLanguage === 'fr') {
      setProduct(frenchProduct);
    } else {
      setProduct(englishProduct);
    }
  }, [currentLanguage, frenchProduct, englishProduct]);


  const isMutating = loading || isPending

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    await addToCart({
      product_id: product.id,
      quantity: 1
    })
    setLoading(false)
    mutate('cart')
    startTransition(() => {
      router.refresh()
    })
  }
  

  return (
    <>
      <div className=' mx-5 breadcrumbs text-sm font-extrabold'>
        <ul>
          <li>
            <Link href='/'>{page.product.breadCrumbs1}</Link>
          </li>
          <li>
            <Link href='/products'>{page.product.breadCrumbs2}</Link>
          </li>
          <li>{product.name}</li>
        </ul>
      </div>
      <div className='flex justify-end'>

      <button
        onClick={toggleLanguage}
        className="btn btn-outline mx-12 mt-8 sm:btn-lg"
      >
        {currentLanguage === 'fr' ? 'Switch to English' : 'Changer en Français'}
      </button>
      </div>
      <section >
      
        <div className='container'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            {/* Image gallery */}
            <Tab.Group as='div' className='flex flex-col-reverse'>
              {/* Image selector */}
              <div className='mx-auto mt-6  w-full max-w-2xl sm:block lg:max-w-none'>
                <Tab.List className='grid grid-cols-4 gap-6'>
                  {product.images.map(image => (
                    <Tab
                      key={image.id}
                      className='bg-white text-stone-900 hover:bg-stone-50 relative flex h-24 cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase focus:outline-none'
                    > 
                      {({ selected }) => (
                        <>
                          <span className='sr-only'>
                            {' '}
                            {image?.file?.metadata}{' '}
                          </span>
                          <span className='absolute inset-0 overflow-hidden object-cover object-center rounded-md h-auto'>
                            <Image
                              alt=''
                              fill
                              sizes='(min-width: 1024px) 50vw, 100vw'
                              src={image?.file?.url}
                              priority
                              
                            />
                          </span>
                          <span
                            className={clsx(
                              selected ? 'ring-sky-500' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                            )}
                            aria-hidden='true'
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className='aspect-h-1 aspect-w-1 w-full h-auto'>
                {product.images?.map(image => (
                  <Tab.Panel key={image.id}>
                    <Image
                      priority
                      src={image.file.url}
                      alt={image.file.metadata || ''}
                      style={{
    objectFit: 'contain',
  }}
                      fill
                      className='h-full w-full sm:rounded-lg '
                      sizes='(min-width: 1024px) 50vw, 100vw'
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-20'>
              <h1 className='text-3xl font-bold tracking-tight text-neutral lg:mt-20'>
                {product.name}
              </h1>

              <div className='mt-3'>
                <h2 className='sr-only'>Product information</h2>
                <p className='text-3xl tracking-tight text-neutral'>
                  {formatCurrency({ amount: product.price })}
                </p>
              </div>

              {/* Reviews */}
              <div className='mt-3'>
                <h3 className='sr-only'>Reviews</h3>
                <div className='flex items-center'>
                  <div className='flex items-center'>
                    {[0, 1, 2, 3, 4].map(rating => (
                      <StarIcon
                        key={rating}
                        className={clsx(
                          (product.rating || 4) > rating
                            ? 'text-yellow-500'
                            : 'text-stone-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden='true'
                      />
                    ))}
                  </div>
                  <p className='sr-only'>{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className='mt-6'>
                <h3 className='sr-only'>Description</h3>

                <div
                  className='space-y-6 text-base text-neutral'
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <div
              className={`text-lg text-stone-700 pt-10  ${product.stock_level >= 1 ? 'text-success-content' : 'text-error'}`}>
              Stock : 
  {product.stock_level >= 1 ? product.stock_level : page.product.noStock}
              </div>

              <form className='mt-6' onSubmit={handleSubmit}>
                <div className='sm:flex-col1 mt-10 flex'>
                  <button
                    type='submit'
                    disabled={isMutating}
                    className={`btn ${product.stock_level >= 1 ? 'btn-success' : 'btn-disabled'} btn-outline flex max-w-xs flex-1 items-center justify-center px-8 py-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 sm:w-full`}
                  >
                    {isMutating ? <Blinker /> : page.product.cartButton}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Product
