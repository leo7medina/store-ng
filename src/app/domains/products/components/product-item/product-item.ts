import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '@shared/models/product';
import {CommonModule} from '@angular/common';
import {RouterLinkWithHref} from '@angular/router';
import {TimeAgoPipe} from '@shared/pipes/time-ago-pipe';

@Component({
  selector: 'app-product-item',
  imports: [
    CommonModule,RouterLinkWithHref, TimeAgoPipe
  ],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    this.addToCart.emit(this.product);
  }
}
