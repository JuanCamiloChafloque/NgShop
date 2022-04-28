import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'frontend-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  public categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (result) => {
        this.categories = result.categories;
      },
    });
  }

  updateCategory(id: string) {
    this.router.navigate(['categories/form/' + id]);
  }

  deleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Category Deleted',
              detail: 'The category was deleted successfully',
            });
            this.categoriesService.getCategories().subscribe({
              next: (result) => {
                this.categories = result.categories;
              },
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Category Error',
              detail: 'Category could not be deleted: ' + err.error.message,
            });
          },
        });
      },
    });
  }
}
