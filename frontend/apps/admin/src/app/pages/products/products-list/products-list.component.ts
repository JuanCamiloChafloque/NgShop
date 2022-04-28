import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'frontend-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (result) => {
        this.products = result.products;
      },
    });
  }

  updateProduct(id: string) {
    this.router.navigate(['products/form/' + id]);
  }

  deleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Product Deleted',
              detail: 'The product was deleted successfully',
            });
            this.productsService.getProducts().subscribe({
              next: (result) => {
                this.products = result.products;
              },
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Product Error',
              detail: 'Product could not be deleted: ' + err.error.message,
            });
          },
        });
      },
    });
  }
}
