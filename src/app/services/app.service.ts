import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  deleteBill(billId: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/bill/${billId}`, {
      withCredentials: true, // Gửi kèm cookie để xác thực
    });
  }

  // Hàm lấy thể loại từ API
  getCategories(): any {
    return this.http.get<any>('http://localhost:8000/api/category/getall');
  }

  // Thêm vào AppService
  getBillDetails(billId: number): any {
    return this.http.get<any>(
      `http://localhost:8000/api/billDetail/${billId}`,
      {
        withCredentials: true, // Gửi kèm cookie để xác thực
      }
    );
  }

  // Phương thức lấy danh sách hóa đơn theo user_id
  getBillsByUserId(userId: number): any {
    return this.http.get<any>(`http://localhost:8000/api/bill/${userId}`, {
      withCredentials: true,
    });
  }

  // Gửi yêu cầu tạo hóa đơn
  createBill(billData: any): any {
    return this.http.post<any>(`http://localhost:8000/api/bill`, billData, {
      withCredentials: true, // Gửi cookie kèm theo để xác thực người dùng
    });
  }

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
