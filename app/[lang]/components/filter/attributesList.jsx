'use client'

import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import React, {useState, useEffect } from 'react'
import Image from 'next/image'
import Pagination from './pagination'

const AttributesList = ({page, attributes, products}) => {
  const [price, setPrice] = useState('')
  const [country, setCountry] = useState('')
  const [locality, setLocality] = useState('')
  const [period, setPeriod] = useState('')
  const [stages, setStages] = useState('')
  const [category, setCategory] = useState('') // Utilisez une variable distincte pour stocker les données des catégories
  const [sorting, setSorting] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(100);
  const [locale, setLocale] = useState('en'); // État pour suivre la valeur de $locale
  const [localeAttributes, setLocaleAttributes] = useState('en'); // État pour suivre la valeur de $locale


  const toggleLocale = () => {
    // Toggle entre 'fr' et 'en' en fonction de la valeur actuelle de locale
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    setLocale(newLocale);
    const newLocaleAttributes = localeAttributes === 'fr' ? 'en' : 'fr';
    setLocaleAttributes(newLocaleAttributes);
  };

   

  /*const fetchAllProducts = cache(async (page, locale) => {
    try {
      const { results } = await getProducts({
        page,
        $locale: locale
      });
  
      if (results.length === 0) {
        // Aucun résultat trouvé, nous avons récupéré toutes les pages.
        return results;
      }
  
      // Récupérez les résultats des pages suivantes récursivement.
      const nextPageResults = await fetchAllProducts(page + 1, locale);
  
      // Concaténez les résultats actuels avec les résultats des pages suivantes.
      return [...results, ...nextPageResults];
    } catch (error) {
      console.error('Erreur lors du chargement des produits :', error);
      throw error; // Vous pouvez gérer l'erreur ici selon vos besoins.
    }
  })
  
  const fetchProducts = cache(async () => {
    try {
      const allProducts = await fetchAllProducts(1, locale);
      setProducts(allProducts);
    } catch (error) {
      console.error('Erreur lors du chargement des produits :', error);
    }
  })*/
  
  useEffect(() => {
    products; // Appel initial pour charger les produits
  
    const interval = setInterval(products, 60000);
  
    return () => {
      clearInterval(interval);
    }
  }, []);


  /*const fetchAttributes = async () => {
    try {
      const { results } = await getAttributes({
        page: 1, // Définissez la valeur de page ici
        $locale: locale // Définissez la valeur de $locale ici
      });
      setAttributes(results)
    } catch (error) {
      console.error('Erreur lors du chargement des produits :', error)
    }
  }

  useEffect(() => {
    fetchAttributes()
    const interval = setInterval(fetchAttributes, 60000)

    return () => {
      clearInterval(interval) // Nettoyage de l'intervalle lors du démontage du composant
    }
  }, [])*/

  const sortedProducts = products.sort((a, b) => {
    if (sorting === 'asc') {
      return a.price - b.price // Tri ascendant
    } else if (sorting === 'desc') {
      return b.price - a.price // Tri descendant
    } else {
      return 0 // Pas de tri
    }
  })

  const filteredProducts = products
    .filter(product => {
      // Filtrer par prix
      switch (price) {
        case '0-100':
          return product.price >= 0 && product.price <= 100
        case '100-200':
          return product.price >= 100 && product.price <= 200
        case '200-500':
          return product.price >= 200 && product.price <= 500
        case '500-1000':
          return product.price >= 500 && product.price <= 1000
        case '1000+':
          return product.price >= 1000
        default:
          return true
      }
    })
    .filter(product => {
      // Filtrer par pays
      if (country !== '') {
        return product.attributes.country.value === country
      } else {
        return true
      }
    })
    .filter(product => {
      // Filtrer par localité
      if (locality !== '') {
        return product.attributes.locality.value === locality
      } else {
        return true
      }
    })
    .filter(product => {
      // Filtrer par période
      if (period !== '') {
        return product.attributes.period.value === period
      } else {
        return true
      }
    })
    .filter(product => {
      // Filtrer par étages
      if (stages !== '') {
        return product.attributes.stages.value === stages
      } else {
        return true
      }
    })
    .filter(product => {
      // Filtrer par catégorie
      if (category !== '') {
        return product.attributes.category.value === category
      } else {
        return true
      }
    })
    .filter(val => {
      return val.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

  const handlePriceFilter = event => {
    const range = event.target.value
    setPrice(range)
  }

  const handleSortingChange = event => {
    setSorting(event.target.value)
  }

  const handleSearchTerm = e => {
    let value = e.target.value
    setSearchTerm(value)
  }


  const sortedAttributeValues = {}

  // Triez les valeurs pour chaque attribut que vous souhaitez trier.
  ;['Category', 'Country', 'Locality', 'Period', 'Stages'].forEach(
    attributeName => {
      const values = attributes
        .filter(
          attribute =>
            attribute &&
            attribute.name === attributeName &&
            Array.isArray(attribute.values)
        )
        .flatMap(attribute => attribute.values)
        .filter(value => value !== '') // Filtrer les valeurs vides
        .sort((a, b) => a.localeCompare(b)) // Trier par ordre alphabétique

      sortedAttributeValues[attributeName] = values
    }
  )

  const sortedCategoryValues = sortedAttributeValues['Category']
  const sortedCountryValues = sortedAttributeValues['Country']
  const sortedLocalityValues = sortedAttributeValues['Locality']
  const sortedPeriodValues = sortedAttributeValues['Period']
  const sortedStagesValues = sortedAttributeValues['Stages']

  
  // Get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  console.log(currentProducts)

  return (
    <div>
      <div className=' mx-5 breadcrumbs text-sm font-extrabold'>
        <ul>
          <li>
            <Link href='/'>{page.shop.breadCrumbs1}</Link>
          </li>
          <li>{page.shop.breadCrumbs2}</li>
        </ul>
      </div>
      <h2 className=' flex justify-center  text-2xl font-bold '>
        {' '}
        {page.shop.header}{' '}
      </h2>
      <div className='flex justify-end'>
      <button className='btn btn-outline  mx-12 mt-8 sm:btn-lg'
      onClick={toggleLocale}>
        {locale === 'fr' ? 'English Version' : 'Version Française'}
      </button>
    </div>
     
      <div className=' m-5 rounded-xl'>
        <div className='h-full w-full flex-col place-items-center  '>
          <div className=' bg-base-200 divide-doubled h-128px   mt-10 grid grid-cols-2  justify-center space-x-2 space-y-2  p-8 sm:grid-cols-2 xl:grid-cols-8 lg:mx-8'>
            <div className='flex justify-center pl-2 pt-2 '>
              <select
                id='category'
                className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 btn btn-outline btn-sm  w-full max-w-xs rounded-xl '
                onChange={e => setCategory(e.target.value)}
                value={category}
              >
                <option className=' font-bold text-left ' value=''>
                  {' '}
                  Categorie{' '}
                </option>
                {sortedCategoryValues.map(value => (
                  <option
                    className='font-style: font-semibold italic text-left'
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className=' flex justify-center'>
              <select
                className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 btn btn-outline btn-sm w-full max-w-xs rounded-xl  font-bold '
                id='price-range'
                value={price}
                onChange={handlePriceFilter}
              >
                <option className='font-bold text-left ' value=''>
                  Prix
                </option>
                <option
                  className='font-style: font-semibold italic text-left '
                  value='0-100'
                >
                  0 - 100
                </option>
                <option
                  className='font-style: font-semibold italic text-left'
                  value='100-200'
                >
                  100 - 200
                </option>
                <option
                  className='font-style: font-semibold italic text-left'
                  value='200-500'
                >
                  200 - 500
                </option>
                <option
                  className='font-style: font-semibold italic text-left'
                  value='500-1000'
                >
                  500 - 1000
                </option>
                <option
                  className='font-style: font-semibold italic text-left'
                  value='1000+'
                >
                  1000 et plus
                </option>
              </select>
            </div>

            <div className='flex justify-center'>
              <label 
              htmlFor='country'
              className=' dark:text-gray-200 flex justify-center font-bold'></label>
              <select
                id='country'
                className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 btn btn-outline btn-sm w-full max-w-xs rounded-xl'
                onChange={e => setCountry(e.target.value)}
                value={country}
                autoComplete='country'

                
              >
                <option className=' font-bold text-left ' value=''>
                  Pays
                </option>

                {sortedCountryValues.map(value => (
                  <option
                    className='font-style: font-semibold italic text-left'
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex justify-center'>
              <label 
              htmlFor='locality'
              className=' dark:text-gray-200 flex justify-center font-bold '></label>
              <select
                id='locality'
                className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 btn btn-outline btn-sm w-full max-w-xs rounded-xl '
                onChange={e => setLocality(e.target.value)}
                value={locality}
                autoComplete='locality'

              >
                <option className='font-bold text-left' value=''>
                  Localité
                </option>

                {sortedLocalityValues.map(value => (
                  <option
                    className='font-style: font-semibold italic text-left'
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex justify-center'>
              <label 
              htmlFor='period'
              className=' dark:text-gray-200 flex justify-center font-bold '></label>
              <select
                id='period'
                className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 btn btn-outline btn-sm w-full max-w-xs rounded-xl '
                onChange={e => setPeriod(e.target.value)}
                value={period}
              >
                <option className='font-bold text-left' value=''>
                  Période
                </option>

                {sortedPeriodValues.map(value => (
                  <option
                    className='font-style: font-semibold italic text-left'
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex justify-center'>
              <label 
              htmlFor='stages'
              className=' dark:text-gray-200 flex justify-center font-bold '></label>
              <select
                id='stages'
                className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 btn btn-outline btn-sm w-full max-w-xs rounded-xl '
                onChange={e => setStages(e.target.value)}
                value={stages}
              >
                <option className='font-bold text-left' value=''>
                  Etages
                </option>

                {sortedStagesValues.map(value => (
                  <option
                    className='font-style: font-semibold italic text-left'
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-span-2 flex justify-center font-bold  sm:col-span-2 xl:flex-none'>
              <select
                id='sorting'
                className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 btn btn-outline btn-sm w-full max-w-xs rounded-xl '
                value={sorting}
                onChange={handleSortingChange}
              >
                <option
                  className=' font-style: font-semibold italic text-left'
                  value='date'
                >
                  Date de Création
                </option>
                <option
                  className=' font-style: font-semibold italic text-left'
                  value='asc'
                >
                  Tri ascendant
                </option>
                <option
                  className=' font-style: font-semibold italic text-left'
                  value='desc'
                >
                  Tri descendant
                </option>
              </select>
            </div>
          </div>
          <div className='  h-full w-full font-bold'>
            <div className='container '>
              <div className=' flex justify-center pt-8 '>
                <input
                  className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 input   w-full max-w-xs rounded-xl  btn-outline'
                  type='text'
                  name='searchBar'
                  id='searchBar'
                  placeholder={page.shop.searchBar}
                  onChange={handleSearchTerm}
                />
              </div>

              <div className='   mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8'>
                {currentProducts.map(product => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className='group'
                  >
                    <div className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-base-100 hover:bg-base-200'>
                    <div className=' block aspect-h-1 aspect-w-1 relative w-full overflow-hidden rounded-xl '>
                      <Image
                        src={product.images[0].file.url}
                        alt={product.description}
                        fill
                        sizes='(min-width: 1024px) 50vw, 100vw'
                        className='  object-cover object-center transition-opacity group-hover:opacity-75'
                        priority
                      />
                    </div>
                    <h3 className='text-stone-700 mt-4 text-sm'>
                      {product.name}
                    </h3>
                    <p className='text-stone-900 mt-1 text-lg font-medium'>
                      {formatCurrency({ amount: product.price })}
                    </p>
                    <p className={`text-lg text-stone-700 flex justify-end pb-2 pr-2  ${product.stock_level >= 1 ? 'text-success-content' : 'text-error'}`}>
  {product.stock_level >= 1 ? `Stock: ${product.stock_level}` : page.shop.noStock}
</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </div>
  )
}

export default AttributesList
