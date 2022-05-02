import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public isCategoryPage!: boolean;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        params['id'] ? this.getProducts([params['id']]) : this.getProducts();
        params['id']
          ? (this.isCategoryPage = true)
          : (this.isCategoryPage = false);
      },
    });
    this.getCategories();
  }

  getProducts(filter?: any) {
    this.productsService.getProducts(filter).subscribe({
      next: (result) => {
        this.products = result.products;
      },
    });
  }

  getCategories() {
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
