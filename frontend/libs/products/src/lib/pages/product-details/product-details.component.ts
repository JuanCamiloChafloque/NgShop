import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@frontend/orders';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'frontend-product-details',
  templateUrl: './product-details.component.html',
  styles: [],
})
export class ProductDetailsComponent implements OnInit {
  public product!: Product;
  public quantity = 1;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.getProducts(params['id']);
        }
      },
    });
  }

  getProducts(id: string) {
    this.productsService.getProductById(id).subscribe({
      next: (result) => {
        this.product = result.product;
      },
    });
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: '' + this.product._id,
      quantity: this.quantity,
    };

    this.cartService.setCartItem(cartItem);
  }
}
