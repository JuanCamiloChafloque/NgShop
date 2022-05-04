import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<any> {
    return this.http.post('http://localhost:5000/api/v1/orders', order, {
      withCredentials: true,
    });
  }

  getOrders(): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/orders', {
      withCredentials: true,
    });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/products/' + id, {
      withCredentials: true,
    });
  }

  getTotalSales(): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/orders/sales', {
      withCredentials: true,
    });
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/orders/' + id, {
      withCredentials: true,
    });
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.put(
      'http://localhost:5000/api/v1/orders/' + id,
      {
        status,
      },
      { withCredentials: true }
    );
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete('http://localhost:5000/api/v1/orders/' + id, {
      withCredentials: true,
    });
  }
}
