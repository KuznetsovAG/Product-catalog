import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearBasket } from "../reducers/productReducer";

interface PropsModal {
  active: boolean,
  setActive: (product:boolean) => void
}


const Modal:FC<PropsModal> = ({ active, setActive }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    setActive(false);
    dispatch(clearBasket());
  };

  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__close" onClick={closeModal}>
          <Link to="/">Закрыть</Link>
        </div>
        <h2 className="modal__title">Поздравляю!!! Ваш заказ оформлен</h2>
      </div>
    </div>
  );
};

export default Modal;
