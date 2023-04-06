import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    if (count <= 1) {
      return setCount(1);
    }
    setCount((prevState) => prevState - 1);
  };

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      {count}
      <button onClick={() => setCount((prevState) => prevState + 1)}>+</button>
    </div>
  );
};

export default Counter;
