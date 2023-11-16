import React from 'react';
import AttributesList from '../components/filter/attributesList'
import { getDictionary } from '../dictionaries';
import { getAttributes, getProducts, getProducts2, getProducts3, getProducts4, getProducts5 } from '@/lib/swell/products';

export const revalidate = 60

export default async function Page({
  params : { lang }
}) {
const {page } = await getDictionary(lang);
const {results: attributes} = await getAttributes ({ page: 1 })
const {results: products1} = await getProducts ({ page: 1  })
const {results: products2} = await getProducts2 ({ page: 2  })
const {results: products3} = await getProducts3 ({ page: 3  })
const {results: products4} = await getProducts4 ({ page: 4 }) 
const {results: products5} = await getProducts5 ({ page: 5 })

const products = [].concat(products1, products2, products3, products4, products5);


return (
  <div >
    <AttributesList  page = {page} attributes={attributes} products={products}/>
   </div>
);
};