import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchQuery: string = ''; // Từ khóa tìm kiếm
  products: any[] = []; // Danh sách sản phẩm kết quả tìm kiếm
  errorMessage: string = '';

  constructor(private appService: AppService) {}

  // Hàm tìm kiếm khi người dùng nhấn tìm kiếm
  searchProducts() {
    if (this.searchQuery.trim() !== '') {
      this.appService.searchProducts(this.searchQuery).subscribe(
        (response: any) => {
          this.products = response; // Lưu kết quả tìm kiếm
          this.errorMessage = '';
        },
        (error: any) => {
          console.error('Error fetching search results:', error);
          this.errorMessage = 'Không tìm thấy sản phẩm phù hợp.';
        }
      );
    } else {
      this.errorMessage = 'Vui lòng nhập từ khóa tìm kiếm.';
    }
  }
}
