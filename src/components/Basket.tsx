import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteBasketProduct } from "../reducers/productReducer";
import Counter from "./Counter";
import Modal from "./Modal";
import { emptyShoppingCart } from "../reducers/productReducer";
import { useAppDispacth, useAppSelector } from "../hooks/hook";
import { Product } from "../types/Products";
const Basket = () => {
  const [modalActive, setModalActive] = useState(false);

  const { shoppingCarts, totalPrice } = useAppSelector(
    (state) => state.productReducer
  );
  const dispatch = useAppDispacth();

  const removeCard = (id:Product) => {
    dispatch(deleteBasketProduct(id));
  };

  const handleEmptyBasket = () => {
    if (shoppingCarts.length === 0) {
      dispatch(emptyShoppingCart());
    }
  };
  const handleCheckountProduct = async (product:Product[]) => {
    const config:any = {
      headers: {
        "Content-Length": JSON.stringify(product).length,
        "Content-Type": "text/plain",
      },
      responseType: "text",
    };
    try {
      const response = await axios.post(
        "https://app.aaccent.su/js/confirm.php",
        JSON.stringify(product),
        config
      );
      //если contentType я поменяю на JSON, запрос не пройдёт из-за корсов
      //поскольку contentType.JSON не "простой" запрос, то требуется настройка корс на сервере
      //сделал contentType:"text/plain" чтобы не было корсов
      if (response.statusText === "OK") {
        setModalActive(true);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div className="basket">
      <div className="basket__container">
        {shoppingCarts.length > 0 ? (
          shoppingCarts.map((goods) => (
            <div className="basket__item" key={goods.id}>
              <h2>{goods.title}</h2>
              <img src={goods.image} alt="card" className="card__img" />

              <Counter
                price={goods.regular_price.value}
                countId={goods.count}
                currency={goods.regular_price.currency}
              />
              <button
                onClick={() => removeCard(goods)}
                className="button__delete"
              >
                Удалить
              </button>
            </div>
          ))
        ) : (
          <h1>Корзина пустая</h1>
        )}
        {shoppingCarts.length > 0 && (
          <div className="basket__subtotal">
            <h2>Общая сумма покупки: {Math.round(totalPrice)} USD</h2>
            <input
              type="text"
              placeholder="Введите ваше имя"
              className="basket__input"
            />
            <input
              type="text"
              placeholder="Укажите ваш телефон"
              className="basket__input"
            />
            <button
              type="submit"
              className="basket__checkout"
              onClick={() => handleCheckountProduct(shoppingCarts)}
            >
              Оформить заказ
            </button>
            {modalActive && (
              <Modal active={modalActive} setActive={setModalActive} />
            )}
          </div>
        )}
      </div>
      <Link to="/">
        <button className="button__back" onClick={handleEmptyBasket}>
          Вернуться в каталог товаров
        </button>
      </Link>
    </div>
  );
};

export default Basket;
