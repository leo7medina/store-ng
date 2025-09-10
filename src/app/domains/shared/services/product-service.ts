import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '@shared/models/product';
import {environment} from '@env/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() {}

  getProducts(category_id?: string) {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (category_id) {
      url.searchParams.set('category_Id', category_id);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}/api/v1/products/${id}`);
  }

}
