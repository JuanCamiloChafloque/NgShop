import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'frontend-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  public orders: Order[] = [];
  public ORDER_STATUS: any = {
    Pending: 'primary',
    Processed: 'warning',
    Shipped: 'warning',
    Delivered: 'success',
    Failed: 'danger',
  };

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe({
      next: (result) => {
        this.orders = result.orders;
      },
    });
  }

  showOrder(id: string) {
    this.router.navigate(['orders/' + id]);
  }

  deleteOrder(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Order Deleted',
              detail: 'The order was deleted successfully',
            });
            this.ordersService.getOrders().subscribe({
              next: (result) => {
                this.orders = result.orders;
              },
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Order Error',
              detail: 'Order could not be deleted: ' + err.error.message,
            });
          },
        });
      },
    });
  }
}
