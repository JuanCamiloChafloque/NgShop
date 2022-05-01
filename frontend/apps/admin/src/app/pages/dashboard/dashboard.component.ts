import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { ProductsService } from '@frontend/products';
import { UsersService } from '@frontend/users';

@Component({
  selector: 'frontend-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public orders = 0;
  public products = 0;
  public users = 0;
  public sales = 0;

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe({
      next: (result) => {
        this.orders = result.count;
      },
    });

    this.productsService.getProducts().subscribe({
      next: (result) => {
        this.products = result.count;
      },
    });

    this.usersService.getUsers().subscribe({
      next: (result) => {
        this.users = result.count;
      },
    });

    this.ordersService.getTotalSales().subscribe({
      next: (result) => {
        this.sales = result.totalSales;
      },
    });
  }
}
