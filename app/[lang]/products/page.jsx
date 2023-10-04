import React from 'react';
import AttributesList from '../components/filter/attributesList'
import { getDictionary } from '../dictionaries';
import { getAttributes, getProducts } from '@/lib/swell/products';
import { cache } from 'react'



export default cache(async function Page({
  params : { lang }
}) {
const {page } = await getDictionary(lang);
const {results: attributes} = await getAttributes ({ page: 1 })
const {results: products} = await getProducts ({ page: 1 })
console.log(products)

return (
  <div >
    <AttributesList  page = {page} attributes={attributes} products={products}/>
   </div>
);
});