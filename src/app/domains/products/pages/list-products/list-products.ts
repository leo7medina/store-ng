import {ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit, signal} from '@angular/core';
import {Product} from '@shared/models/product';
import {Category} from '@shared/models/category';
import {ProductService} from '@shared/services/product-service';
import {CategoryService} from '@shared/services/category-service';
import {CartService} from '@shared/services/cart-service';
import {CommonModule} from '@angular/common';
import {ProductItem} from '@products/components/product-item/product-item';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-products',
  imports: [
    CommonModule,
    ProductItem,
    RouterLink,
  ],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ListProducts implements OnInit, OnChanges {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  @Input() id?: string;
  @Input() slug?: string;


  ngOnInit() {
    this.getListCategories();
    this.getListProducts();
  }

  ngOnChanges() {
    this.getListProducts()
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getListProducts() {
    this.productService.getProducts({category_slug: this.slug}).subscribe({
      next: (products) => this.products.set(products),
      error: (err) => console.log(err)
    });
  }
  private getListCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (err) => console.log(err)
    });
  }
}
