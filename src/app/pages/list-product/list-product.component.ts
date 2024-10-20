import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store'; // Import Store
import { addToCart } from '../../store/cart/cart.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent implements OnInit {
  products: any = [];
  paginatedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9; // mỗi trang có 9 sp
  totalPages: number = 0;
  searchQuery: string = '';
  noResults: boolean = false; // Biến để kiểm tra có sản phẩm hay không
  categories: any[] = [];

  constructor(
    private app: AppService,
    private store: Store,
    private route: ActivatedRoute // Import ActivatedRoute để nhận query params
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    // Lấy từ khóa tìm kiếm từ query params
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || ''; // Nếu không có từ khóa tìm kiếm, để rỗng
      this.loadProducts(); // Tải sản phẩm khi có từ khóa hoặc không
    });
  }
  // Hàm lấy danh sách thể loại
  loadCategories(): void {
    this.app.getCategories().subscribe(
      (response: any) => {
        this.categories = response; // Lưu dữ liệu thể loại nhận được\
      },
      (error: any) => {
        console.error('Failed to load categories:', error);
      }
    );
  }

  loadProducts(): void {
    if (this.searchQuery) {
      // Nếu có từ khóa tìm kiếm, thực hiện tìm kiếm
      this.searchProducts();
    } else {
      // Nếu không có từ khóa tìm kiếm, tải toàn bộ sản phẩm
      this.app.products().subscribe((res: any) => {
        this.products = res.data;
        this.noResults = this.products.length === 0; // Kiểm tra nếu không có sản phẩm
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.loadPage(this.currentPage);
      });
    }
  }

  // Hàm tìm kiếm sản phẩm dựa trên từ khóa
  searchProducts() {
    this.app.searchProducts(this.searchQuery).subscribe(
      (response: any) => {
        this.products = response; // Lưu kết quả tìm kiếm
        this.noResults = this.products.length === 0; // Kiểm tra nếu không có sản phẩm
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.loadPage(this.currentPage); // Phân trang sau khi có kết quả tìm kiếm
        console.log('Search results:', this.products);
      },
      (error: any) => {
        console.error('Search failed:', error);
        this.noResults = true; // Nếu có lỗi khi tìm kiếm, hiển thị thông báo không tìm thấy sản phẩm
      }
    );
  }

  loadPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }

  addToCart(product: any): void {
    this.store.dispatch(addToCart({ product })); // Dispatch hành động addToCart
  }
}
