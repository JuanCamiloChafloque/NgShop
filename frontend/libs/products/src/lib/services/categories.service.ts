import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/categories', {
      withCredentials: true,
    });
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/categories/' + id, {
      withCredentials: true,
    });
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post('http://localhost:5000/api/v1/categories', category, {
      withCredentials: true,
    });
  }

  updateCategory(id: string, category: Category): Observable<any> {
    return this.http.put(
      'http://localhost:5000/api/v1/categories/' + id,
      category,
      { withCredentials: true }
    );
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete('http://localhost:5000/api/v1/categories/' + id, {
      withCredentials: true,
    });
  }
}
