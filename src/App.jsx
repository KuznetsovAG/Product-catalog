import React from "react";
import { Route, Routes } from "react-router-dom";
import Basket from "./components/Basket";
import Main from "./components/Main";

const App = () => {
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
