import { Component, Input, OnInit } from '@angular/core';
import { CartItem, CartService } from '@frontend/orders';
import { Product } from '../../models/Product';

@Component({
  selector: 'frontend-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  constructor(private cartsService: CartService) {}

  ngOnInit(): void {}

  addProductToCart() {
    const cartItem: CartItem = {
      productId: '' + this.product._id,
      quantity: 1,
    };
    this.cartsService.setCartItem(cartItem);
  }
}
