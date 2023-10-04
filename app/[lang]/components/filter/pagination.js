import React from 'react';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="join flex justify-center space-x-2">
        {pageNumbers.map(number => (
          <li key={number} >
            <button onClick={() => paginate(number)}
            className="join-item btn"
             >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;