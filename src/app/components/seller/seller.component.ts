import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
})
export class SellerComponent {
  products: any[] = [];
  constructor(private app: AppService, private router: Router) {}
  ngOnInit(): void {
    this.app.products().subscribe((res: any) => {
      this.products = res.data;
    });
  }
}
