import { Component, effect, inject, input, linkedSignal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '@shared/services/product-service';
import { CartService } from '@shared/services/cart-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  readonly slug = input.required<string>();
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  constructor() {
    effect(() => {
      const product = this.productRx.value();
      if (product) {
        this.titleService.setTitle(product.title);
        this.metaService.addTags([
          { name: 'description', content: product.description },
        ]);
        this.metaService.updateTag({
          name: 'og:title',
          content: product.title,
        });
        this.metaService.updateTag({
          name: 'og:image',
          content: product.images[0],
        });
        this.metaService.updateTag({
          name: 'og:description',
          content: product.description,
        });
        this.metaService.updateTag({
          name: 'og:url',
          content: `${environment.domain}/product/${product.slug}`,
        });
      }
    });
  }

  productRx = rxResource({
    params: () => ({ product_slug: this.slug() }),
    stream: ({ params }) => this.productService.getOne(params),
  });
  $cover = linkedSignal({
    source: () => this.productRx.value(),
    computation: (product, previous) => {
      if (product && product?.images?.length > 0) {
        return product.images[0];
      }
      return previous?.value ?? '';
    },
  });

  changeCover(newImg: string) {
    this.$cover.set(newImg);
  }

  addToCart() {
    const product = this.productRx.value();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
