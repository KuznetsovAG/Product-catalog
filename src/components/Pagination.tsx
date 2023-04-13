import React, { FC } from "react";


interface PropsPagination {
  totalProducts: number,
  productsPerPage: number,
  paginate: (pageNumber:number) => void
}

const Pagination: FC<PropsPagination> = ({ totalProducts, productsPerPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <ul className="pagination__numbers">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination__item">
            <a
              href="#"
              className="pagination__link"
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
