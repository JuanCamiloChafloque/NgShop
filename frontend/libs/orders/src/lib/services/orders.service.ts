import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/orders');
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/orders/' + id);
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.put('http://localhost:5000/api/v1/orders/' + id, {
      status,
    });
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete('http://localhost:5000/api/v1/orders/' + id);
  }
}
