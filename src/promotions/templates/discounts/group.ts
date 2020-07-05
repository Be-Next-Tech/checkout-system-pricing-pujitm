import { PriceOption } from 'pricing';

/**
 *  e.g. if 3 items sell for price of 130, `price` will be 130 while `quantity` will be 3
 */
interface DiscountParams {
  /**
   * Minimum quantity for the discount to take effect
   */
  quantity: number;
  /**
   * Total price of the discounted group of items.
   */
  price: number;
}

/**
 * In a Group Discount, the discount only applies to complete groups of the threshold quantity--leftover units are priced regularly.
 *
 * e.g. if 3 items sell for price of 130, while each unit usually sells for 50, 5 units will sell for
 *
 *  `130 (the 3 items) + 2 (the leftover items) *50 = 230`
 *
 * To implement this example use the following params:
 *  - `price: 130`
 *  - `quantity: 3`
 * @param params
 */
export function MakeGroupDiscount(params: DiscountParams): PriceOption {
  const { quantity: unitsInGroup, price: discountPrice } = params;

  return ({ item }) => {
    const groups = Math.floor(item.quantity / unitsInGroup); // Whole groups that the discount will apply to
    const remainingUnits = item.quantity % unitsInGroup; // Units that will be priced regularly

    return groups * discountPrice + remainingUnits * item.product.price; // Sum discounted units with regular units
  };
}
