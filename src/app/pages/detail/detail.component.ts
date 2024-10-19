import { NgIf } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store'; // Import Store
import { addToCart, updateQuantity } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf],

  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  product: any;
  quantity: number = 1;
  id: number | null = null;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Lấy id từ URL
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id')); // Lấy id từ URL và chuyển thành kiểu number
      if (this.id) {
        // Gọi API với id lấy được
        this.appService.getProductById(this.id).subscribe(
          (data: any) => {
            this.product = { ...data, quantity: this.quantity };
          },
          (error: any) => {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
          }
        );
      }
    });
  }
  addToCart(product: any): void {
    this.store.dispatch(addToCart({ product })); // Dispatch hành động addToCart
    console.log('Product added to cart:', product);
    this.router.navigate(['/cart']);
  }
  increaseQuantity(): void {
    this.quantity++; // Tăng số lượng
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--; // Giảm số lượng nếu lớn hơn 1
    }
  }
  getTotalPrice(): number {
    return this.product ? this.product.price * this.quantity : 0;
  }
}
