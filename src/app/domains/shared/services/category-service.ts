import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '@shared/models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  constructor() {
    /* empty */
  }

  getAll() {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/v1/categories`);
  }

  async getAllPromise(): Promise<Category[]> {
    const response = await fetch(`${environment.apiUrl}/api/v1/categories`);
    return await response.json();
  }
}
