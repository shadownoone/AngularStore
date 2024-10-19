import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../services/app.service'; // Nhập AppService để gọi API tìm kiếm
import { FormsModule } from '@angular/forms'; // Nhập FormsModule để sử dụng ngModel
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartCount } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  cartItemCount$: Observable<number> = new Observable<number>();
  isLoggedIn: boolean = false;
  searchQuery: string = '';

  constructor(
    private router: Router,
    private appService: AppService,
    private store: Store<{ cart: { products: any[] } }>
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus(); // Kiểm tra trạng thái đăng nhập khi component khởi tạo
    this.cartItemCount$ = this.store.select(selectCartCount);
  }

  // Phương thức kiểm tra trạng thái đăng nhập
  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Nếu có token, trạng thái đăng nhập là true
  }

  // Hàm xử lý đăng xuất
  logout() {
    localStorage.removeItem('token'); // Xóa token
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Điều hướng về trang đăng nhập
  }

  // Hàm xử lý tìm kiếm sản phẩm
  searchProducts() {
    if (this.searchQuery.trim() !== '') {
      // Gọi API tìm kiếm từ AppService
      this.appService.searchProducts(this.searchQuery).subscribe(
        (response: any) => {
          console.log('Search results:', response);
          // Bạn có thể xử lý kết quả tìm kiếm, ví dụ điều hướng đến trang kết quả tìm kiếm
          this.router.navigate(['/list-product'], {
            queryParams: { search: this.searchQuery },
          });
        },
        (error: any) => {
          console.error('Search failed:', error);
        }
      );
    }
  }
}
