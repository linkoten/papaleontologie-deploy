import {swell} from './client'
import { CATEGORIES_PER_PAGE, PRODUCTS_PER_PAGE } from '../constants'

export const revalidate = 1




export const getProducts = async ({
  page= 1,
  limit = 100,
  sort ='date_created',
  filters = {},

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    $filters: filters,
    expand: ['variants', 'categories' ]
  });
}

export const getProducts2 = async ({
  page= 2,
  limit = 100,
  sort ='date_created',
  categories =  [],
  filters = {},
  $locale = 'fr'

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    categories,
    $filters: {filters},
    expand: ['variants', 'categories', ],
    $locale: $locale

    
  });
}

export const getProducts3 = async ({
  page= 3,
  limit = 100,
  sort ='date_created',
  categories =  [],
  filters = {},
  $locale = 'fr'

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    categories,
    $filters: {filters},
    expand: ['variants', 'categories', ],
    $locale: $locale

    
  });
}

export const getProducts4 = async ({
  page= 4,
  limit = 100,
  sort ='date_created',
  categories =  [],
  filters = {},
  $locale = 'fr'

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    categories,
    $filters: {filters},
    expand: ['variants', 'categories', ],
    $locale: $locale

    
  });
}

export const getProducts5 = async ({
  page= 5,
  limit = 100,
  sort ='date_created',
  categories =  [],
  filters = {},
  $locale = 'fr'

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    categories,
    $filters: {filters},
    expand: ['variants', 'categories', ],
    $locale: $locale

    
  });
}



export const getFrenchProducts = async ({
  page = 1,
  limit = PRODUCTS_PER_PAGE,
  sort ='date_created',
  categories =  [],
  filters = {},
  $locale = 'fr'

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    categories,
    $filters: {filters},
    expand: ['variants', 'categories', ],
    $locale

    
  });
}



export const getFrenchProductBySlugOrId = async (slugOrId) => {
  return await swell.products.get(slugOrId, {$locale: 'fr'})
}

export const getEnglishProductBySlugOrId = async (slugOrId) => {
  return await swell.products.get(slugOrId, {$locale: 'en'})
}

export const getSettings = async (slug) => {
  await swell.settings.get(slug)

}

export const listFilters = async products => {
  return await swell.products.filters(products)
}

export const listCategories = async (limit = CATEGORIES_PER_PAGE, page = 1) => {
  return await swell.categories.list({
    limit,
    page,
    expand: ['products']
  })
}

export const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Trending', value: 'trending' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' }
]

export const sortMap = new Map([
  ['latest', ''],
  ['price-asc', 'price-asc'],
  ['price-desc', 'price-desc'],
  ['trending', 'popularity']
])

[
  {
    "code": "en",
    "name": "English"
  },
  {
    "code": 'fr',
    "name": "French"
  }
]

export const getProductLowCost = async () => {
  return await swell.get('/products', {
    where: {
      price: { $lte: 100 }
    },
    $locale: ['en', 'fr']
    
  })
}

export const localizeProduct = async () => {
  return await swell.products.list({
    limit: 30,
    page: 1,
    $locale: "en"
  })
}

export const getProductMediumCost = async () => {
  return await swell.get('/products', {
    where: {
      price: { $gte: 100, $lte: 500 }
    }
  })
}

export const getProductExpensive = async () => {
  return await swell.get('/products', {
    where: {
      price: { $gte: 500 }
    }
  })
}

export const getCategories = async () => {
  return await swell.get('/categories', {
    
    limit: 25,
    page: 1
  })
}

export const getAttributes = async () => {
  return await swell.get('/attributes', {
    limit: 25,
    page: 1
  })
}

export const getOrders = async () => {
  return await swell.get('/orders', {
    limit: 25,
    page: 1,
  })};

  export const getOrder = async () => {
    return await swell.account.listOrders({
      limit: 10,
      page: 2
    })
  }