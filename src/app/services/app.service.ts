import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  searchProducts(searchQuery: string): any {
    return this.http.get<any>(`http://localhost:8000/api/product/search`, {
      params: { search: searchQuery },
    });
  }

  // Gửi yêu cầu để lấy thông tin người dùng hiện tại
  getCurrentUser(): any {
    return this.http.get<any>(`http://localhost:8000/api/auth/current-user`, {
      withCredentials: true, // Gửi cookie kèm theo để xác thực người dùng
    });
  }

  // Gửi yêu cầu đăng nhập
  login(userData: any): any {
    return this.http.post<any>(
      `http://localhost:8000/api/auth/login`,
      userData,
      {
        withCredentials: true, // Thêm cấu hình để gửi cookie kèm theo
      }
    );
  }

  // Gửi yêu cầu đăng ký
  register(userData: any): any {
    return this.http.post<any>(
      `http://localhost:8000/api/auth/register`,
      userData
    );
  }

  products(): any {
    return this.http.get<any>(`http://localhost:8000/api/product`);
  }

  // Hàm lấy chi tiết sản phẩm theo ID
  getProductById(id: number): any {
    return this.http.get<any>(`http://localhost:8000/api/product/${id}`);
  }
}
