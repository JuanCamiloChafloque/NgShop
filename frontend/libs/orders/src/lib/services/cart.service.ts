import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  initCartLocalStorage() {
    const cart: Cart = JSON.parse('' + localStorage.getItem('cart'));
    if (!cart) {
      const initialCart = {
        items: [],
      };
      localStorage.setItem('cart', JSON.stringify(initialCart));
    }
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart: Cart = JSON.parse('' + localStorage.getItem('cart'));
    const itemExist = cart.items.find(
      (item) => item.productId === cartItem.productId
    );
    if (itemExist) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem.quantity;
        }
      });
    } else {
      cart.items.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
}
