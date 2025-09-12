import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@shared/models/product';
import { environment } from '@env/environment.staging';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(params: { category_id?: string; category_slug?: string }) {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (params.category_id) {
      url.searchParams.set('categoryId', params.category_id);
    }
    if (params.category_slug) {
      url.searchParams.set('categorySlug', params.category_slug);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(params: { product_id?: string; product_slug?: string }) {
    if (!params.product_id && !params.product_slug) {
      throw new Error(
        'Se requiere al menos un parámetro: product_id o product_slug',
      );
    }
    const endpoint = params.product_id
      ? `products/${params.product_id}`
      : `products/slug/${params.product_slug}`;
    console.log('endpoint: ', endpoint);
    return this.http.get<Product>(`${environment.apiUrl}/api/v1/${endpoint}`);
  }
}
