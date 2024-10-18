import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent {
  products: any;
  constructor(private app: AppService) {}
  ngOnInit(): void {
    this.app.products().subscribe((res: any) => {
      this.products = res.data;
    });
  }
}
