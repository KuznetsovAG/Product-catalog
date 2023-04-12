import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Basket from "./components/Basket";
import Main from "./components/Main";
import { addBrands, addProducts } from "./reducers/productReducer";
import { products } from "./api/products";
import { brands } from "./api/brands";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addProducts(products));
    dispatch(addBrands(brands));
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </>
  );
};

export default App;
