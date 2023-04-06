import React, { useState } from "react";
import Cards from "./Cards";
import { brands } from "../api/brands";
import { products } from "../api/products";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Main = () => {
  const [checked, setChecked] = useState(null);
  const [productsCard, setProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProduct = productsCard.slice(
    firstProductIndex,
    lastProductIndex
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const productFiltration = () => {
    setProducts(
      productsCard.filter((currentProduct) => checked === currentProduct.brand)
    );
  };

  const handleReset = () => {
    setProducts(products);
  };

  console.log("productsCard :>> ", productsCard);
  return (
    <div className="app">
      <div className="basket__product">
        <Link to="/basket">
          <h2>Корзина</h2>
        </Link>
      </div>

      <div className="app__container">
        <div className="brands">
          <h1>Бренды</h1>
          <div className="brands__form">
            {brands.map((brand) => (
              <form className="brands__checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={checked === brand.id}
                    onChange={() => setChecked(brand.id)}
                    className="brands__input"
                  />
                  {brand.title}
                </label>
              </form>
            ))}
          </div>
          <button className="brands__apply" onClick={productFiltration}>
            Применить
          </button>
          <p className="brands__reset" onClick={handleReset}>
            X Сбросить
          </p>
        </div>
        <Cards productsCard={currentProduct} />
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={productsCard.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Main;
