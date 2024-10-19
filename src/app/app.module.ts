import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { cartReducer } from './store/cart/cart.reducer';

@NgModule({
  imports: [StoreModule.forRoot({ cart: cartReducer })],
})
export class AppModule {}
