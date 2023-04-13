import React, { FC } from "react";
import { useAppDispacth } from "../hooks/hook";
import { addBasket } from "../reducers/productReducer";
import { Product } from "../types/Products";


interface PropsCards {
  productsCard: Product[]
}


const Cards: FC<PropsCards> = ({ productsCard }) => {
  const dispatch = useAppDispacth();
  const handleBasket = (product:Product) => {
    const addCountProduct = { ...product };
    addCountProduct.count++;
    dispatch(addBasket(addCountProduct));
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
