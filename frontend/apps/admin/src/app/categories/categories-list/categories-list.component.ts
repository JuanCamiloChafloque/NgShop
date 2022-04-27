import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@frontend/products';

@Component({
  selector: 'frontend-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  public categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (result) => {
        this.categories = result.categories;
      },
    });
  }
}
