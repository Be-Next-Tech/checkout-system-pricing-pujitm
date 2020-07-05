import { MakeSkuPromotion } from './sku';
import { createMock } from 'ts-auto-mock';
import { PricingDependencies } from 'pricing';

describe('Promotion Templates', () => {
  describe('Sku Promotions', () => {
    it('Does not apply promotions to inapplicable skus', () => {
      const discount = jest.fn();
      const promo = MakeSkuPromotion({ skus: [], discount });

      const promoPrice = promo(createMock<PricingDependencies>());

      expect(promoPrice).toEqual(undefined);
    });

    it('Applies promotions to applicable skus', () => {
      const makeDependenciesWithSku = (sku) =>
        createMock<PricingDependencies>({ item: { product: { sku } } });
      const validSkus = ['a', 'b'];
      const discount = jest.fn(() => 5);
      const promo = MakeSkuPromotion({ skus: validSkus, discount });

      const testSkus = { invalid: [null, undefined, 0, 1, '', 'c', 'B'], valid: validSkus };

      const validPromoPrices = testSkus.valid.map((sku) => promo(makeDependenciesWithSku(sku)));
      const invalidPromoPrices = testSkus.invalid.map((sku) => promo(makeDependenciesWithSku(sku)));

      expect(validPromoPrices.every((val) => val === 5)).toEqual(true);

      // Inapplicable SKUs should not yield a return value
      expect(invalidPromoPrices.every((val) => val === undefined)).toEqual(true);
    });
  });
});
