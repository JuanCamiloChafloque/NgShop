import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'frontend-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit {
  public totalPrice!: number;
  public isCheckout = false;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.router.url.includes('checkout')
      ? (this.isCheckout = true)
      : (this.isCheckout = false);
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe({
      next: (cart) => {
        this.totalPrice = 0;
        if (cart) {
          cart.items.map((item) => {
            this.ordersService.getProductById(item.productId).subscribe({
              next: (result) => {
                this.totalPrice += result.product.price * item.quantity;
              },
            });
          });
        }
      },
    });
  }
}
