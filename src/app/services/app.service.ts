import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}
  products(): any {
    return this.http.get<any>(`http://localhost:8000/api/product`);
  }

  // Hàm lấy chi tiết sản phẩm theo ID
  getProductById(id: number): any {
    return this.http.get<any>(`http://localhost:8000/api/product/${id}`);
  }
}
