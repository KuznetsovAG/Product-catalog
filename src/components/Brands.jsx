import React, { useState } from "react";
import { brands } from "../api/brands";
const Brands = () => {
  const [checked, setChecked] = useState(false);

  //   const chengeCheckbox = () => {
  //     setChecked(!checked);
  //   };
  console.log("checked :>> ", checked);
  return (
    <div className="brands">
      <h1>Бренды</h1>
      <div className="brands__form">
        {brands.map((brand) => (
          <form className="brands__checkbox">
            <label>
              <input
                type="checkbox"
                checked={checked === brand.code}
                onChange={() => setChecked(brand.code)}
                className="brands__input"
              />
              {brand.title}
            </label>
          </form>
        ))}
      </div>
      <button className="brands__apply">Применить</button>
      <p className="brands__reset">X Сбросить</p>
    </div>
  );
};

export default Brands;
