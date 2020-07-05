/**
 * Add your checkout implementation to this file
 *
 * You can change any interfaces and types included by default as long as your
 * implementation achieves the goal specified in the README.
 *
 * Feel free to ask any questions you have.
 */

import { Product, SKU } from './product';
import { Cart, ItemInCart } from './cart';
import { PriceChooser } from './pricing';

/**
 * Interface that your checkout implementation should conform to
 */
export interface CheckoutInterface {
  add(...items: Product[]): unknown;
  /** Returns the total amount to charge the customer */
  total(): number;
}

export class Checkout implements CheckoutInterface {
  private cart: Cart = new Map<SKU, ItemInCart>();
  constructor(private runPricingStrategy: PriceChooser) {}

  add(...items: Product[]): void {
    items.forEach((item) => this.addItem(item));
  }

  total(): number {
    let subtotal = 0;
    this.cart.forEach((item) => (subtotal += item.amountToCharge));
    return subtotal;
  }

  private addItem(item: Product) {
    const cart = this.cart;

    if (cart.has(item.sku)) {
      cart.get(item.sku).quantity++;
    } else {
      cart.set(item.sku, new CheckoutItem(item));
    }

    this.onItemAdded();
  }

  private onItemAdded() {
    this.refreshAllItemPrices();
  }

  private refreshAllItemPrices() {
    return this.cart.forEach((item, sku, cart) => {
      item.amountToCharge = this.runPricingStrategy({ item, sku, cart });
    });
  }
}

class CheckoutItem implements ItemInCart {
  amountToCharge: number;
  constructor(readonly product: Product, public quantity = 1) {
    this.amountToCharge = this.subtotal();
  }

  /** Shortcut to multiply product's regular unit price by the quantity */
  private subtotal(): number {
    return this.quantity * this.product.price;
  }
}
