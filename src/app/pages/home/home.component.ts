import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { ProductSectionComponent } from '../../components/product-section/product-section.component';
import { FeatureProductComponent } from '../../components/feature-product/feature-product.component';
import { SellerComponent } from '../../components/seller/seller.component';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    ProductSectionComponent,
    FeatureProductComponent,
    SellerComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
