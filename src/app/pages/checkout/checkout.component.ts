import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<any[]>;
  // Các thuộc tính cho form
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  mobile: string = '';
  email: string = '';
  orderNotes: string = '';
  constructor(private store: Store) {
    // Lấy thông tin giỏ hàng từ store
    this.cartItems$ = this.store.select(selectCartItems);
  }

  ngOnInit(): void {}

  calculateTotal(cartItems: any[] | null): number {
    if (!cartItems) {
      return 0; // Trả về 0 nếu cartItems là null
    }
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
