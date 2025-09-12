import { Component, inject, signal } from '@angular/core';
import { CartService } from '@shared/services/cart-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  toggleSideMenu() {
    this.hideSideMenu.update((prevState) => !prevState);
  }
}
