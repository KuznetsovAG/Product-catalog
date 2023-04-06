import React from "react";
import { Link } from "react-router-dom";
import Counter from "./Counter";
const Basket = ({ shoppingCart }) => {
  return (
    <div>
      {shoppingCart ? (
        shoppingCart.map((goods) => (
          <div>
            <h2>{goods.title}</h2>
            <img src={goods.image} alt="card" className="card__img" />
            <p>
              Стоимость:{goods.regular_price.value}{" "}
              {goods.regular_price.currency}
            </p>
            <Counter />
            <button>Удалить</button>
          </div>
        ))
      ) : (
        <h1>Корзина пустая</h1>
      )}
      <Link to="/">Вернуться в каталог товаров </Link>
    </div>
  );
};

export default Basket;
