import React, { useState } from "react";
import Cards from "./Cards";
import { products } from "../api/products";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import {
  filteredProductsCards,
  resetProducts,
  toogleChecked,
} from "../reducers/productReducer";
import { useAppDispacth, useAppSelector } from "../hooks/hook";

const Main = () => {
  const [showBrands, setShowBrands] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const dispatch = useAppDispacth();
  const { shoppingCarts, brandsProduct, productsItems } = useAppSelector(
    (state) => state.productReducer
  );
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProduct = productsItems.slice(
    firstProductIndex,
    lastProductIndex
  );

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };
  const handleShowBrands = () => {
    setShowBrands((prevState) => !prevState);
  };

  const productFiltration = () => {
    dispatch(filteredProductsCards());
  };

  const handleReset = () => {
    dispatch(resetProducts(products));
  };

  const handleChecked = (id: number) => {
    dispatch(toogleChecked(id));
  };

  return (
    <div className="app">
      <div className="basket__product">
        <Link to="/basket">
          <span className="basket__icon">
            Корзина
            {shoppingCarts.length > 0 ? `: ${shoppingCarts.length}` : ""}
          </span>
        </Link>
      </div>

      <div className="app__container">
        <div className="brands">
          <h1>Бренды </h1>
          <div onClick={handleShowBrands} className="brands__visibility">
            {showBrands ? <p>Скрыть</p> : <p>Показать</p>}
          </div>
          {showBrands && (
            <div className="brands__form">
              {brandsProduct.map((brand) => (
                <form className="brands__checkbox" key={brand.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={brand.checked}
                      onChange={() => handleChecked(brand.id)}
                      className="brands__input"
                    />
                    {brand.title}
                  </label>
                </form>
              ))}
            </div>
          )}
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
        totalProducts={productsItems.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Main;
