import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {Product} from '@shared/models/product';
import {ProductService} from '@shared/services/product-service';
import {CartService} from '@shared/services/cart-service';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {

  @Input() id?: string;
  @Input() slug?: string;
  product = signal<Product | null>(null);
  cover = signal('');
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit() {
    if (this.id) {
      this.getProductById({product_id: this.id});
    }
    if (this.slug) {
      this.getProductById({product_slug: this.slug});
    }

  }

  private getProductById(params: {product_id?: string; product_slug?: string}) {
    this.productService.getOne(params).subscribe({
      next: (product) => {
        this.product.set(product);
        if (product.images.length > 0) {
          this.cover.set(product.images[0]);
        }
      }
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
