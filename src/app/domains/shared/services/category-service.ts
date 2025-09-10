import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '@shared/models/category';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  constructor() { }

  getAll() {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/v1/categories`);
  }


}
