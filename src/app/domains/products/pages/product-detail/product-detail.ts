import { Component, inject, OnInit, signal, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '@shared/models/product';
import { ProductService } from '@shared/services/product-service';
import { CartService } from '@shared/services/cart-service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  readonly id = input<string>();
  readonly slug = input<string>();
  product = signal<Product | null>(null);
  cover = signal('');
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit() {
    const id = this.id();
    if (id) {
      this.getProductById({ product_id: id });
    }
    const slug = this.slug();
    if (slug) {
      this.getProductById({ product_slug: slug });
    }
  }

  private getProductById(params: {
    product_id?: string;
    product_slug?: string;
  }) {
    this.productService.getOne(params).subscribe({
      next: (product) => {
        this.product.set(product);
        if (product.images.length > 0) {
          this.cover.set(product.images[0]);
        }
      },
    });
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
