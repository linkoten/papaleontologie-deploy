import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server'
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'

let defaultLocale = 'en'
let locales = ['en', 'fr']

function getLocale(request) {
  const negotiatorHeaders = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator ({ headers: negotiatorHeaders}).languages()

  const locale = matchLocale(languages, locales, defaultLocale)
  return locale
}

export function middleware(request) {

  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )


if (pathnameIsMissingLocale) {
  const locale = getLocale(request)

  // e.g. incoming request is /products
  // The new URL is now /en-US/products

  return NextResponse.redirect(
    new URL(`/${locale}/${pathname}`, request.url)
    )
}
return NextResponse.next();

}


export default () => {
  useEffect(() => {
    authMiddleware({});
  }, []);
};



 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
