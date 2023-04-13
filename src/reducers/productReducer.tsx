import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Brand, Product, StateProduct } from "../types/Products";

const initialState: StateProduct = {
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
    addBrands: (state, action:PayloadAction<Brand[]>) => {
      state.brandsProduct = action.payload.map((brand) => ({
        ...brand,
        checked: false,
      }));
    },
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.productsItems = action.payload;
    },
    resetProducts: (state, action: PayloadAction<Product[]>) => {
      state.productsItems = action.payload;
      state.brandsProduct = state.brandsProduct.map((brand) => ({
        ...brand,
        checked: false,
      }));
    },
    filteredProductsCards: (state) => {
      const chekedBrands = state.brandsProduct
        .filter((product) => product.checked === true)
        .map(({ id }) => id);
      if (!chekedBrands.length) {
        return state;
      }

      const filteredProducts = state.productsItems.filter((product) =>
        chekedBrands.includes(product.brand)
      );
      state.productsItems = filteredProducts;
    },
    addBasket: (state, action: PayloadAction<Product>) => {
      const currentCard = state.shoppingCarts.find((card) => {
        return card.id === action.payload.id;
      });
      if (currentCard === undefined) {
        state.shoppingCarts.push(action.payload);
        state.totalPrice += action.payload.regular_price.value;
      }
    },
    deleteBasketProduct: (state, action: PayloadAction<Product>) => {
      state.shoppingCarts = state.shoppingCarts.filter(
        (cart) => cart.id !== action.payload.id
      );
      console.log("action.payload :>> ", action.payload);
      state.totalPrice -= action.payload.regular_price.value;
    },
    clearBasket: (state) => {
      state.shoppingCarts = [];
      state.totalPrice = 0;
    },
    handleIncrement: (state, action: PayloadAction<number>) => {
      state.totalPrice += action.payload;
    },
    handleDecrement: (state, action: PayloadAction<number>) => {
      state.totalPrice -= action.payload;
    },
    emptyShoppingCart: (state) => {
      state.totalPrice = 0;
    },
    toogleChecked: (state, action: PayloadAction<number>) => {
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
