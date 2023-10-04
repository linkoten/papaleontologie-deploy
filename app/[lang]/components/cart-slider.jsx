'use client'

import { Fragment, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Blinker } from './ui/loading';
import { formatCurrency } from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeFromCart } from '@/lib/swell/cart';
import { useSWRConfig } from 'swr';

const CartSlider = ({ cart, cartIsLoading, open, setCartSliderIsOpen }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const isMutating = loading || isPending;

  const removeItem = async (itemId) => {
    setLoading(true);
    await removeFromCart(itemId);
    setLoading(false);
    mutate('cart');
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setCartSliderIsOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='bg-gray-500 fixed inset-0 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-[370px] pl-10 sm:max-w-sm md:max-w-md lg:max-w-full  '>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll rounded-xl bg-sixth-color shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-gray-900 text-lg font-medium'>
                          {' '}
                          Shopping cart{' '}
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-gray-400 hover:text-gray-500 -m-2 p-2'
                            onClick={() => setCartSliderIsOpen(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='divide-gray-200 -my-6 divide-y'
                          >
                            {cart?.items?.length > 0 &&
                              cart.items.map((item) => (
                                <li key={item.id} className='flex py-6'>
                                  {item.product &&
                                    item.product.images &&
                                    item.product.images[0] &&
                                    item.product.images[0].file.url ? (
                                      <div className='border-gray-200 relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border'>
                                        <Image
                                          src={item.product.images[0].file.url}
                                          alt={item.product.name}
                                          className='h-full w-full object-cover object-center'
                                          fill
                                          sizes='h-24 w-24'
                                        />
                                      </div>
                                    ) : (
                                      // Si aucune image n'est disponible, supprimez le produit du panier
                                      removeItem(item.id)
                                    )}

                                  <div className='ml-4 flex flex-1 flex-col'>
                                    <div>
                                      <div className=' transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-gray-900 flex justify-between text-base hover:bg-base-200 text-xs font-bold  '>
                                      <h3  >
                                        {item.product && item.product.slug && item.product.name && (
                                          <a  
                                          href={`/products/${item.product.slug}`}>
                                            {item.product.name}
                                          </a>
                                        )}
                                      </h3>
                                        <p className='ml-4'>
                                          {formatCurrency({
                                            amount: item.price_total,
                                          })}
                                        </p>
                                      </div>
                                      <p className='text-gray-500 mt-1 text-xs'>
                                      {item.product && item.product.name}
                                      </p>
                                    </div>
                                    <div className='flex flex-1 items-end justify-between text-sm'>
                                      <p className='text-gray-500'>
                                        Qty {item.quantity}
                                      </p>

                                      <div className='flex'>
                                        <button
                                          type='button'
                                          disabled={isMutating}
                                          onClick={() => removeItem(item.id)}
                                          className='text-pink-600 hover:bg-base-200 font-medium disabled:cursor-not-allowed disabled:opacity-50'
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-gray-200 border-t px-4 py-6 sm:px-6'>
                      <div className='text-gray-900 flex justify-between text-base font-medium'>
                        <p>Subtotal</p>
                        <p>
                          {formatCurrency({ amount: cart?.sub_total || 0 })}
                        </p>
                      </div>
                      <p className='text-gray-500 mt-0.5 text-sm'>
                        Shipping and taxes calculated at checkout.
                      </p>

                      {cart?.checkout_url && (
                        <div className='mt-6'>
                          <Link href={cart.checkout_url}>
                            <button
                              disabled={cartIsLoading}
                              className=' text-white flex h-12 w-full items-center justify-center btn btn-outline btn-success px-6 py-3 '
                            >
                              {cartIsLoading ? <Blinker /> : 'Checkout'}
                            </button>
                          </Link>
                        </div>
                      )}

                      <div className='text-gray-500 mt-6 flex justify-center text-center text-sm'>
                        <p>
                          or{' '}
                          <button
                            type='button'
                            className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-cyan-600 hover:bg-base-200 font-medium'
                            onClick={() => setCartSliderIsOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CartSlider
