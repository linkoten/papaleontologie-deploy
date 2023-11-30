'use client'

import { useState } from 'react'

import Link from 'next/link'
import useSWR from 'swr'
import CartSlider from '../cart-slider'

import { getCart } from '@/lib/swell/cart'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

import { SignInButton, UserButton } from '@clerk/nextjs'
import { SignedIn, SignedOut } from '@clerk/nextjs/app-beta/client'

import Logo from './logo'


const Header = ({layout}) => {
  const { data: cart, isLoading } = useSWR('cart', getCart)
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false)



  return (
    <>
      <header data-theme='corporate' className=' bg-fifth-color text-primary-content rounded-xl z-10 py-6 m-5  '>
        <nav className='  container flex items-center justify-between'>
          {/* Logo */}
          <div>
            <Link
              href='/'
              className=' grow transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 flex items-center text-3xs font-bold uppercase tracking-widest sm:text-sm lg:text-2xl'
            >
              <Logo  />
            </Link>
          </div>

          {/* Nav links */}
          <ul className='flex items-center gap-2 sm:gap-6 lg:gap-10'>
            <li className=' transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-3xs font-medium uppercase tracking-wider sm:text-xs lg:text-sm '>
                <Link href='/about'>{layout.about}</Link>
            </li>
            <SignedIn>
            <li className=' transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-3xs font-medium uppercase tracking-wider sm:text-xs lg:text-sm'>
              <Link href='/blog'>{layout.blog}</Link>
            </li>
            <li className=' transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-3xs font-medium uppercase tracking-wider sm:text-xs lg:text-sm '>
              <Link href='/products'>{layout.shop}</Link>
            </li>
            </SignedIn>
          </ul>

          {/* Shopping cart */}
          <div className=' flex items-center  justify-between gap-1 lg:gap-6  '>
            <button
              className=' transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 flex items-center lg:gap-x-2 pl-4 '
              onClick={() => setCartSliderIsOpen(open => !open)}
            >
              <ShoppingCartIcon className='h-4 w-4 sm:h-7 sm:w-7  ' />

              {cart?.item_quantity ? (
                <span className='flex h-2 w-2 items-center justify-center rounded bg-sky-600 text-2xs font-medium text-white lg:text-xs '>
                  {cart?.item_quantity}
                </span>
              ) : null}
            </button>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode='modal'>
                <button
                 className=' btn-xs text-2xs md:btn-md md:text-md  rounded border border-gray-400 px-3 py-0.5 '>
                  {layout.connexion}
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
      </header>
      <CartSlider
        cart={cart}
        cartIsLoading={isLoading}
        open={cartSliderIsOpen}
        setCartSliderIsOpen={setCartSliderIsOpen}
      />
    </>
  )
}

export default Header
