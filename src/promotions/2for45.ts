import { MakeGroupDiscount } from './templates/discounts/group';
import { MakeSkuPromotion } from './templates/sku';

// Groups of 2 product B's will be sold for 45
// Leftover quantity of units will be sold at normal unit price

const APPLICABLE_SKUS = ['B'];

const UNITS_IN_GROUP = 2;
const GROUP_PRICE = 45;

export default MakeSkuPromotion({
  skus: APPLICABLE_SKUS,
  discount: MakeGroupDiscount({ quantity: UNITS_IN_GROUP, price: GROUP_PRICE }),
});
