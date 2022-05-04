import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../../models/Order';
import * as countriesLib from 'i18n-iso-countries';
import { User } from '@frontend/users';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/Cart';
import { OrdersService } from '../../services/orders.service';

declare const require: any;

@Component({
  selector: 'frontend-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  public form!: FormGroup;
  public isSubmitted = false;
  public orderItems: any = [];
  public user!: User;
  public countries!: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.initCheckoutForm();
    this.getCountries();
    this.user = JSON.parse('' + localStorage.getItem('user'));
  }

  initCheckoutForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.getCartItems();
      const order: Order = {
        user: '6268359aa7ec003a1862541a',
        orderItems: this.orderItems,
        shippingAddress1: this.form.controls['street'].value,
        shippingAddress2: this.form.controls['apartment'].value,
        city: this.form.controls['city'].value,
        zip: this.form.controls['zip'].value,
        country: this.form.controls['country'].value,
        phone: this.form.controls['phone'].value,
      };

      this.ordersService.createOrder(order).subscribe({
        next: () => {
          this.cartService.emptyCart();
          this.router.navigate(['/success']);
        },
      });
    }
  }
}
