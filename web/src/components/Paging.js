import React from 'react';
import ReactPaginate from 'react-paginate';

const Paginig = ({ setFilter, filter, totalPages }) => {
  return (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={({ selected }) => setFilter({ ...filter, page: selected * 1 })}
      containerClassName={'paging-container'}
      activeClassName={'active'}
    />
  );
};

export default Paginig;
