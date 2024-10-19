import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { addToCart } from './store/cart/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      cartItems.forEach((item: any) => {
        this.store.dispatch(addToCart({ product: item }));
      });
    }
  }
}
