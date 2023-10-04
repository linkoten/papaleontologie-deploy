'use client'
import React, { useState } from 'react';

function BlogFilter({ options, initialFilter, onFilterChange, page }) {
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div className=' flex justify-center items-center'>
      <label htmlFor="filterSelect"></label>
      <select
        className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 select max-w-2xs rounded-xl btn btn-outline font-bold '
        id="filterSelect"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value=""
        className='font-style: font-semibold italic text-left'>{page.blog.filterButton}</option>
        {options.map((option) => (
          <option
          className='font-style: font-semibold italic text-left' 
          key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BlogFilter;
