import React, { useState } from "react";
const Counter = ({ price, countId, currency }) => {
  const [count, setCount] = useState(countId);
  const [priceCard, setPriceCard] = useState(price);
  const handleDecrementButton = () => {
    if (count <= 1) {
      return setCount(1);
    }
    setCount((prevState) => prevState - 1);
    setPriceCard((prevState) => prevState - price);
  };

  const handleIncrementButton = () => {
    setCount((prevState) => prevState + 1);
    setPriceCard((prevState) => prevState + price);
  };

  return (
    <div>
      <button onClick={handleDecrementButton}>-</button>
      {count}
      <button onClick={handleIncrementButton}>+</button>
      <p>
        Стоимость: {Math.round(priceCard)} {currency}
      </p>
    </div>
  );
};

export default Counter;
