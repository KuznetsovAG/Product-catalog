export interface Product {
  type: string;
  id: number;
  sku: string;
  title: string;
  regular_price: RegularPrice;
  image: string;
  brand: number;
  count: number;
}

interface RegularPrice {
  currency: string;
  value: number;
}

export interface Brand {
  id: number;
  title: string;
  sort: string;
  code: string;
  checked?: boolean;
}

export interface StateProduct {
  productsItems: Product[];
  filteredProductItems: Product[];
  checkedItem: boolean;
  shoppingCarts: Product[];
  brandsProduct: Brand[];
  totalPrice: number;
}
