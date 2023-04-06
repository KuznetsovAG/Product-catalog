import React, { useState } from "react";
import Basket from "./Basket";

const Cards = ({ productsCard }) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const handleBasket = (product) => {
    setShoppingCart([...shoppingCart, product]);
  };

  console.log("shoppingCart :>> ", shoppingCart);

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
      <Basket shoppingCart={shoppingCart} />
    </div>
  );
};

export default Cards;
