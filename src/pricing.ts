import { ItemInCart, Cart } from './cart';
import { SKU } from './product';

export interface PricingDependencies {
  item: ItemInCart;
  sku: SKU;
  cart: Cart;
}

/** May return a subtotal price to charge a customer */
export type PriceOption = (dependencies: PricingDependencies) => number | void;

/** Returns a `PriceChooser` that can select from the given `PriceOption`s  */
export type PricingStrategyFactory = (options: PriceOption[]) => PriceChooser;

/** Returns the subtotal price to charge a customer */
export type PriceChooser = (dependencies: PricingDependencies) => number;

// Strategy Factories

/**
 * Choose the lowest possible price
 * @param possiblePrices
 */
const Minima: PricingStrategyFactory = (possiblePrices) => (props) => {
  const defaultPrice = props.item.product.price * props.item.quantity;
  const prices = [defaultPrice, ...possiblePrices.map((strategy) => strategy(props))];
  return Math.min(...removeInvalidPrices(prices));
};

export const MakePricingStrategy = {
  Minima,
};

// Helpers

function removeInvalidPrices(prices: (number | void)[]): number[] {
  function isNumber(val): val is number {
    return val !== undefined && val !== null && Number(val) !== NaN;
  }
  return prices.filter(isNumber);
}
