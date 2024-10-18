import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
})
export class SellerComponent {
  products: any;
  constructor(private app: AppService) {}
  ngOnInit(): void {
    this.app.products().subscribe((res: any) => {
      this.products = res.data;
    });
  }
}
