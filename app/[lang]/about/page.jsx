import React from 'react';
import { getDictionary } from '../dictionaries'

export default async function About({
  params: { lang }
}) {
  const { page } = await getDictionary(lang);

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>{page.about.title}</h1>
        <p className='text-gray-500'>{page.about.description}</p>
      </div>
    </section>
  );
}