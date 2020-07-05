import { Product, SKU } from './product';

export interface ItemInCart {
  product: Product;
  quantity: number;
  /**
   * Amount to charge for this item
   *
   * Intended to support charge for an amount differing from the normal subtotal
   */
  amountToCharge: number;
}

export type Cart = Map<SKU, ItemInCart>;
