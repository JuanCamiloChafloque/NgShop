import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'frontend-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit {
  public orderStatus: any = [];
  public order!: any;
  public id = '';
  public currentStatus = '';

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.orderStatus.push('Pending');
    this.orderStatus.push('Processed');
    this.orderStatus.push('Shipped');
    this.orderStatus.push('Delivered');
    this.orderStatus.push('Failed');
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.id = params.id;
          this.ordersService.getOrderById(this.id).subscribe({
            next: (result) => {
              this.order = result.order;
            },
          });
        }
      },
    });
  }

  updateStatus() {
    console.log(this.currentStatus);
    this.ordersService.updateStatus(this.id, this.currentStatus).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Order Status',
          detail: 'Order status updated successfully to ' + this.currentStatus,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Order Status',
          detail: 'Order status failed to update ' + err.error.message,
        });
      },
    });
  }
}
