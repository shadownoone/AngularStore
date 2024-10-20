import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { AppService } from '../../services/app.service'; // Nhập AppService để gọi API
import { clearCart } from '../../store/cart/cart.actions'; // Import clearCart action
import { Router } from '@angular/router';
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
  cartItems: any[] = [];
  firstName: string = '';

  address: string = '';
  mobile: string = '';
  email: string = '';
  orderNotes: string = '';
  isSubmitting: boolean = false;

  constructor(
    private store: Store,
    private appService: AppService,
    private router: Router
  ) {
    // Lấy thông tin giỏ hàng từ store
    this.cartItems$ = this.store.select(selectCartItems);
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  // Tính tổng giá trị giỏ hàng
  calculateTotal(cartItems: any[] | null): number {
    if (!cartItems) {
      return 0; // Trả về 0 nếu cartItems là null
    }
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  placeOrder() {
    if (this.isSubmitting) {
      return; // Không cho phép submit nhiều lần
    }

    this.isSubmitting = true; // Vô hiệu hóa nút sau khi nhấn
    this.cartItems$.pipe(take(1)).subscribe((cartItems) => {
      const billData = {
        method: 'Thanh toán khi nhận tiền', // Bạn có thể điều chỉnh phương thức thanh toán
        status: 'Chưa duyệt', // Trạng thái ban đầu
        description: this.orderNotes || 'Không có ghi chú',
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
        totalAmount: this.calculateTotal(cartItems),
        customerInfo: {
          firstName: this.firstName,

          address: this.address,
          mobile: this.mobile,
          email: this.email,
        },
      };

      // Gửi yêu cầu tạo hóa đơn lên BE
      this.appService.createBill(billData).subscribe(
        (response: any) => {
          console.log('Hóa đơn đã được tạo:', response);
          // Sau khi tạo hóa đơn thành công, xóa giỏ hàng
          this.store.dispatch(clearCart());
          // Điều hướng người dùng đến trang cảm ơn hoặc trang khác
          this.router.navigate(['/status-order']);
        },
        (error: any) => {
          console.error('Lỗi khi tạo hóa đơn:', error);
        }
      );
    });
  }
}
