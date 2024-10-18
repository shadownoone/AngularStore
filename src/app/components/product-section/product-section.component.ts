import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Thêm RouterModule
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-product-section',
  standalone: true, // Đánh dấu là standalone
  imports: [CommonModule, RouterModule], // Import CommonModule và RouterModule
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.css'], // Sửa styleUrl thành styleUrls
})
export class ProductSectionComponent {
  products: any;

  constructor(private app: AppService) {}

  ngOnInit(): void {
    this.app.products().subscribe((res: any) => {
      this.products = res.data;
    });
  }
}
