import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/Cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'frontend-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [],
})
export class CartIconComponent implements OnInit {
  public cart!: Cart | null;
  public cartCount = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe({
      next: (cart) => (this.cartCount = cart?.items.length ?? 0),
    });
  }
}
