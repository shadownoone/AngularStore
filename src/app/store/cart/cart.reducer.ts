import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, updateQuantity } from './cart.actions';

export interface CartState {
  products: any[];
}

const initialState: CartState = {
  products: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
    const existingProductIndex = state.products.findIndex(
      (item) => item.id === product.id
    );

    // Nếu sản phẩm đã tồn tại, tăng số lượng
    if (existingProductIndex !== -1) {
      return {
        ...state,
        products: state.products.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới
    return {
      ...state,
      products: [...state.products, { ...product, quantity: 1 }],
    };
  }),
  on(removeFromCart, (state, { index }) => ({
    ...state,
    products: state.products.filter((_, i) => i !== index),
  })),
  on(updateQuantity, (state, { index, quantity }) => ({
    ...state,
    products: state.products.map((product, i) =>
      i === index ? { ...product, quantity } : product
    ),
  }))
);
