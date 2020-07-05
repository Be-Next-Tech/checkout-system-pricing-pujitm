import { PriceOption } from 'pricing';

interface DiscountParams {
  triggerQuantity: number;
  newUnitPrice: number;
}

/**
 * A bulk discount is a unit-level discount that is triggered when a minimum quantity
 * `triggerQuantity` (inclusive) is purchased. The item's unit price is then discounted to the `newUnitPrice`
 */
export function MakeBulkDiscount(params: DiscountParams): PriceOption {
  return ({ item }) => {
    if (item.quantity >= params.triggerQuantity) return item.quantity * params.newUnitPrice;
  };
}
