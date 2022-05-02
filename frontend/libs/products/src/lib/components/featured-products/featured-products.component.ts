import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'frontend-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [],
})
export class FeaturedProductsComponent implements OnInit {
  public products: any = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getFeaturedProducts(4).subscribe({
      next: (result) => {
        this.products = result.products;
      },
    });
  }
}
