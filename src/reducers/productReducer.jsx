import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsItems: [],
  filteredProductItems: [],
  checkedItem: false,
  shoppingCarts: [],
  brandsProduct: [],
  totalPrice: 0,
};

const productReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    addBrands: (state, action) => {
      state.brandsProduct = action.payload.map((brand) => ({
        ...brand,
        checked: false,
      }));
    },
    addProducts: (state, action) => {
      state.productsItems = action.payload;
    },
    resetProducts: (state, action) => {
      state.productsItems = action.payload;
    },
    filteredProductsCards: (state) => {
      const chekedBrands = state.brandsProduct
        .filter((product) => product.checked === true)
        .map(({ id }) => id);
      if (!chekedBrands.length) {
        return state.productsItems;
      }

      const filteredProducts = state.productsItems.filter((product) =>
        chekedBrands.includes(product.brand)
      );
      state.productsItems = filteredProducts;
    },
    addBasket: (state, action) => {
      const currentCard = state.shoppingCarts.find((card) => {
        return card.id === action.payload.id;
      });
      if (currentCard === undefined) {
        state.shoppingCarts.push(action.payload);
        state.totalPrice += action.payload.regular_price.value;
      }
    },
    deleteBasketProduct: (state, action) => {
      state.shoppingCarts = state.shoppingCarts.filter(
        (cart) => cart.id !== action.payload.id
      );
      state.totalPrice -= action.payload.regular_price.value;
    },
    clearBasket: (state) => {
      state.shoppingCarts = [];
      state.totalPrice = 0;
    },
    handleIncrement: (state, action) => {
      state.totalPrice += action.payload;
    },
    handleDecrement: (state, action) => {
      state.totalPrice -= action.payload;
    },
    emptyShoppingCart: (state) => {
      state.totalPrice = 0;
    },
    toogleChecked: (state, action) => {
      const toogleCard = state.brandsProduct.map((brand) => {
        if (brand.id === action.payload) {
          brand.checked = !brand.checked;
        }
        return brand;
      });
    },
  },
});

export default productReducer.reducer;
export const {
  addProducts,
  addBasket,
  resetProducts,
  deleteBasketProduct,
  handleIncrement,
  handleDecrement,
  toogleChecked,
  clearBasket,
  addBrands,
  filteredProductsCards,
  emptyShoppingCart,
} = productReducer.actions;
