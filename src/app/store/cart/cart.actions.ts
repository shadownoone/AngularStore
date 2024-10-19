import { createAction, props } from '@ngrx/store';

// Thêm sản phẩm vào giỏ hàng
export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ product: any }>()
);

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ index: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ index: number; quantity: number }>()
);

// Xóa toàn bộ giỏ hàng
export const clearCart = createAction('[Cart] Clear');
