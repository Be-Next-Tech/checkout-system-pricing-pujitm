import { PriceOption } from 'pricing';

interface PromotionParams {
  /** SKUs the `discount` will apply to */
  skus: string[];
  /** A discounting strategy */
  discount: PriceOption;
}

/**
 * An Sku Promotion solely relies on (one or more) SKUs to apply a discount
 */
export function MakeSkuPromotion({ skus, discount }: PromotionParams): PriceOption {
  return (params) => {
    if (skus.includes(params.item.product.sku)) return discount(params);
  };
}
