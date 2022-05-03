import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetails } from '../../models/Cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'frontend-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit {
  public cartItemsDetail: CartItemDetails[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.cartService.cart$.subscribe({
      next: (cart) => {
        cart.items.forEach((item) => {
          this.ordersService.getProductById(item.productId).subscribe({
            next: (result) => {
              this.cartItemsDetail.push({
                product: result.product,
                quantity: item.quantity,
              });
            },
          });
        });
      },
    });
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem() {}
}
