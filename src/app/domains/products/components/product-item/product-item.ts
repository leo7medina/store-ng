import {Component, input, output} from '@angular/core';
import {Product} from '@shared/models/product';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLinkWithHref} from '@angular/router';
import {TimeAgoPipe} from '@shared/pipes/time-ago-pipe';

@Component({
  selector: 'app-product-item',
  imports: [
    CommonModule, RouterLinkWithHref, TimeAgoPipe, NgOptimizedImage
  ],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem {
  readonly product = input.required<Product>();
  readonly addToCart = output<Product>();

  addToCartHandler() {
    this.addToCart.emit(this.product());
  }
}
