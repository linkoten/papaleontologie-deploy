import { getEnglishProductBySlugOrId, getFrenchProductBySlugOrId } from '@/lib/swell/products'
import Product from '../../components/product'
import { getDictionary } from '../../dictionaries'
import { cache } from 'react'

export const revalidate = 60


export default async function Page({
  params: {lang, slug }
}) {
  const {page } = await getDictionary(lang);
  const frenchProduct = await getFrenchProductBySlugOrId(slug)
  const englishProduct = await getEnglishProductBySlugOrId(slug)

  return <Product frenchProduct={frenchProduct} page={page} englishProduct={englishProduct} />
}