import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  initCartLocalStorage() {
    const cart: Cart = JSON.parse('' + localStorage.getItem('cart'));
    if (!cart) {
      const initialCart = {
        items: [],
      };
      localStorage.setItem('cart', JSON.stringify(initialCart));
    }
  }

  getCart(): Cart {
    const cart: Cart = JSON.parse('' + localStorage.getItem('cart'));
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart: Cart = JSON.parse('' + localStorage.getItem('cart'));
    const itemExist = cart.items.find(
      (item) => item.productId === cartItem.productId
    );
    if (itemExist) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
        }
      });
    } else {
      cart.items.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(id: string): Cart {
    const cart = this.getCart();
    const newCart = cart.items.filter((item) => item.productId !== id);
    cart.items = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }
}
