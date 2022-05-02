import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(filter?: any): Observable<any> {
    if (!filter) {
      return this.http.get('http://localhost:5000/api/v1/products', {
        withCredentials: true,
      });
    } else {
      const strFilter = filter.join(',');
      return this.http.get(
        'http://localhost:5000/api/v1/products?categories=' + strFilter,
        {
          withCredentials: true,
        }
      );
    }
  }

  getFeaturedProducts(count: number): Observable<any> {
    return this.http.get(
      'http://localhost:5000/api/v1/products/featured?count=' + count,
      {
        withCredentials: true,
      }
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/products/' + id, {
      withCredentials: true,
    });
  }

  addProduct(product: FormData): Observable<any> {
    return this.http.post('http://localhost:5000/api/v1/products', product, {
      withCredentials: true,
    });
  }

  updateProduct(id: string, product: FormData): Observable<any> {
    return this.http.put(
      'http://localhost:5000/api/v1/products/' + id,
      product,
      { withCredentials: true }
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete('http://localhost:5000/api/v1/products/' + id, {
      withCredentials: true,
    });
  }
}
