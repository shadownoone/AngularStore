import { NgIf } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf],

  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  product: any;
  id: number | null = null;

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Lấy id từ URL
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id')); // Lấy id từ URL và chuyển thành kiểu number
      if (this.id) {
        // Gọi API với id lấy được
        this.appService.getProductById(this.id).subscribe(
          (data: any) => {
            this.product = data;
            console.log(data);
          },
          (error: any) => {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
          }
        );
      }
    });
  }
}
