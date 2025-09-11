import {
  Component,
  inject,
  OnInit,
  signal,
  input,
  linkedSignal,
} from '@angular/core';
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
  $product = signal<Product | null>(null);
  /**
   * Se puede utilizar de esta manera el linkedSignal
  $cover = linkedSignal(() => {
    const product = this.$product();
    if (product && product.images.length > 0) {
      return product.images[0];
    }
    return '';
  });*/
  /**
   * Otra manera de utilizar el linkedSignal.
   */
  $cover = linkedSignal({
    source: () => this.$product(),
    computation: (product, previous) => {
      if (product && product?.images?.length > 0) {
        return product.images[0];
      }
      return previous?.value ?? '';
    },
  });
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
      next: (product) => this.$product.set(product),
    });
  }

  changeCover(newImg: string) {
    this.$cover.set(newImg);
  }

  addToCart() {
    const product = this.$product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
