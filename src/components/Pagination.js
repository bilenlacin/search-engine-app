import React from 'react';
import './Pagination.css';

function Pagination({
  postPerPage,
  totalPost,
  paginate,
  changePage,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='paging'>
      <button className='previous' onClick={() => changePage('previous', 1)}>
        Previous
      </button>
      {pageNumbers.slice(0, 3).map((number) => (
        <button className='pageNumber' onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
      {currentPage > 3 &&
        pageNumbers.slice(3, pageNumbers.length - 3).map((number) => (
          <button onClick={() => paginate(number)} className='pageNumber'>
            {number}
          </button>
        ))}
      {pageNumbers.length > 3 && currentPage < 4 ? (
        <button className='dots'>. . .</button>
      ) : (
        ''
      )}
      {pageNumbers.length > 3 &&
        pageNumbers
          .slice(pageNumbers.length - 3, pageNumbers.length)
          .map((number) => (
            <button onClick={() => paginate(number)} className='pageNumber'>
              {number}
            </button>
          ))}

      <button
        className='next'
        onClick={() => changePage('next', pageNumbers.length)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
