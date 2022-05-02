import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/Category';
import { Product } from '../../models/Product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'frontend-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  public products: Product[] = [];
  public categories: Category[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (result) => {
        this.products = result.products;
      },
    });

    this.categoriesService.getCategories().subscribe({
      next: (result) => {
        this.categories = result.categories;
      },
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category._id);

    this.productsService.getProducts(selectedCategories).subscribe({
      next: (result) => {
        this.products = result.products;
      },
    });
  }
}
