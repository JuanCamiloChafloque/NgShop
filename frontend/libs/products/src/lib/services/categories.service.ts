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
    return this.http.get('http://localhost:5000/api/v1/categories');
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post('http://localhost:5000/api/v1/categories', category);
  }
}
