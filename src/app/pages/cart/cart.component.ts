import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeFromCart, updateQuantity } from '../../store/cart/cart.actions';
import { CommonModule } from '@angular/common';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems$: Observable<any>;

  constructor(
    private router: Router,
    private store: Store<{ cart: { products: any[] } }>
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartItems$.subscribe((cartItems) => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
  }

  ngOnInit(): void {}

  removeProduct(index: number) {
    this.store.dispatch(removeFromCart({ index }));
  }

  increaseQuantity(index: number, quantity: number) {
    this.store.dispatch(updateQuantity({ index, quantity: quantity + 1 }));
  }

  decreaseQuantity(index: number, quantity: number) {
    if (quantity > 1) {
      this.store.dispatch(updateQuantity({ index, quantity: quantity - 1 }));
    }
  }

  // Hàm tính tổng tiền
  calculateTotal(cartItems: any[]): number {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  proceedToCheckout(): void {
    // Giả sử bạn lưu token đăng nhập trong localStorage với tên 'token'
    const token = localStorage.getItem('token');

    if (token) {
      // Nếu đã đăng nhập, điều hướng tới trang Checkout
      this.router.navigate(['/checkout']);
    } else {
      // Nếu chưa đăng nhập, hiển thị thông báo yêu cầu đăng nhập
      alert('Yêu cầu đăng nhập để tiếp tục.');
      // Hoặc điều hướng tới trang đăng nhập nếu cần
      // this.router.navigate(['/login']);
    }
  }
}
