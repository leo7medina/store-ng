import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product';
import { ProductService } from '@shared/services/product-service';
import { CategoryService } from '@shared/services/category-service';
import { CartService } from '@shared/services/cart-service';
import { ProductItem } from '@products/components/product-item/product-item';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-products',
  imports: [CommonModule, ProductItem, RouterLink],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ListProducts {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cartService = inject(CartService);
  readonly id = input<string>();
  readonly slug = input<string>();
  cart = this.cartService.cart;

  categoriesResource = resource({
    loader: () => this.categoryService.getAllPromise(),
  });
  productsResource = rxResource({
    params: () => ({ category_slug: this.slug() }),
    stream: ({ params }) => this.productService.getProducts(params),
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  resetCategories() {
    this.categoriesResource.set([]);
  }

  reloadCategories() {
    this.categoriesResource.reload();
  }

  reloadProducts() {
    this.productsResource.reload();
  }
}
