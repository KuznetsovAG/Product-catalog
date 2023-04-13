import React, { FC, useState } from "react";
import { useAppDispacth } from "../hooks/hook";
import { handleDecrement, handleIncrement } from "../reducers/productReducer";

interface PropsCounter {
  price: number,
  countId: number,
  currency:string
}

const Counter:FC<PropsCounter> = ({ price, countId, currency }) => {
  const [count, setCount] = useState(countId);
  const [priceCard, setPriceCard] = useState(price);
  const dispatch = useAppDispacth();
  const handleDecrementButton = () => {
    if (count <= 1) {
      return setCount(1);
    }
    dispatch(handleDecrement(price));
    setCount((prevState) => prevState - 1);
    setPriceCard((prevState) => prevState - price);
  };

  const handleIncrementButton = () => {
    setCount((prevState) => prevState + 1);
    setPriceCard((prevState) => prevState + price);
    dispatch(handleIncrement(price));
  };

  return (
    <div>
      <button onClick={handleDecrementButton}>-</button>
      <span className="counter">{count}</span>
      <button onClick={handleIncrementButton}>+</button>
      <p>
        Стоимость: {Math.round(priceCard)} {currency}
      </p>
    </div>
  );
};

export default Counter;
