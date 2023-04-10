import React from "react";
import { useDispatch } from "react-redux";
import { addBasket } from "../reducers/productReducer";

const Cards = ({ productsCard }) => {
  const dispatch = useDispatch();
  const handleBasket = (product) => {
    dispatch(addBasket(product));
  };
  return (
    <div className="cards__product">
      {productsCard.length > 0 ? (
        productsCard.map((product) => (
          <div key={product.id} className="single__card">
            <h2>{product.title}</h2>
            <img src={product.image} alt="card" className="card__img" />
            <p>
              Стоимость: {product.regular_price.value}{" "}
              {product.regular_price.currency}
            </p>
            <p>Бренд: {product.brand}</p>

            <button
              className="button__basket"
              onClick={() => handleBasket(product)}
            >
              Добавить в корзину
            </button>
          </div>
        ))
      ) : (
        <h1>Товар данного бренда отсуствует</h1>
      )}
    </div>
  );
};

export default Cards;
