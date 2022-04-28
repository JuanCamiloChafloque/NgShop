import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/products');
  }

  getProductById(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/products/' + id);
  }

  addProduct(product: FormData): Observable<any> {
    return this.http.post('http://localhost:5000/api/v1/products', product);
  }

  updateProduct(id: string, product: FormData): Observable<any> {
    return this.http.put(
      'http://localhost:5000/api/v1/products/' + id,
      product
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete('http://localhost:5000/api/v1/products/' + id);
  }
}
