import { MakeGroupDiscount } from './templates/discounts/group';
import { MakeSkuPromotion } from './templates/sku';

// Groups of 3 product A's will be sold for 130
// Leftover quantity of units will be sold at normal unit price

const APPLICABLE_SKUS = ['A'];

const UNITS_IN_GROUP = 3;
const GROUP_PRICE = 130;

export default MakeSkuPromotion({
  skus: APPLICABLE_SKUS,
  discount: MakeGroupDiscount({ quantity: UNITS_IN_GROUP, price: GROUP_PRICE }),
});
