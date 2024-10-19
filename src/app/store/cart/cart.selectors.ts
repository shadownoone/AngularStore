import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

// Chọn phần giỏ hàng từ toàn bộ state
export const selectCartState = createFeatureSelector<CartState>('cart');

// Lấy danh sách sản phẩm trong giỏ hàng
export const selectCartItems = createSelector(
  selectCartState,
  (cart) => cart.products
);

// Tính tổng số lượng sản phẩm trong giỏ hàng (bao gồm quantity)
export const selectCartCount = createSelector(
  selectCartItems,
  (products) => products.reduce((total, product) => total + product.quantity, 0) // Cộng tổng số lượng
);
