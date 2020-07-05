/**
 * Includes a few tests to get you started.
 */
import { CheckoutInterface, Checkout } from './checkout';
import { ProductA, ProductB, ProductC, ProductD } from 'test/mocks/products';
import { Product } from 'product';
import { MakePricingStrategy, PriceOption } from 'pricing';
import faker from 'faker';
import { MakeSkuPromotion } from 'promotions/templates/sku';
import { MakeGroupDiscount } from 'promotions/templates/discounts/group';

function makeCheckout(
  strategies: PriceOption[],
  factory = MakePricingStrategy.Minima
): CheckoutInterface {
  return new Checkout(factory(strategies));
}

function SumReducer(accumulator: number, currentValue: number) {
  return accumulator + currentValue;
}

function getProductsSubtotal(products: Product[]) {
  return products.map((prod) => prod.price).reduce(SumReducer);
}

describe('Checkout Pricing', () => {
  describe('Pricing Strategies', () => {
    it('When given no strategies, it computes the subtotal of the products correctly', () => {
      const checkout = makeCheckout([]);
      const products = [ProductA, ProductA, ProductA, ProductB, ProductB, ProductC, ProductD];
      const expectedTotal = getProductsSubtotal(products);

      checkout.add(...products);

      expect(checkout.total()).toEqual(expectedTotal);
    });

    it('When given no products, it returns a subtotal of 0', () => {
      const checkout = makeCheckout([]);

      expect(checkout.total()).toEqual(0);
    });

    it('Applies given strategies', () => {
      const aPriceLowerThanAllOthers = 0;
      const checkout = makeCheckout([jest.fn(() => aPriceLowerThanAllOthers)]);
      const products = [ProductA, ProductA, ProductA, ProductB, ProductB, ProductC, ProductD];
      const expectedTotal = aPriceLowerThanAllOthers * products.length;

      checkout.add(...products);

      expect(checkout.total()).toEqual(expectedTotal);
    });

    it('Uses given strategy factory', () => {
      const randomPrice = faker.random.number(1000);
      const checkout = makeCheckout(
        [],
        jest.fn(() => () => randomPrice)
      );
      const products = [ProductA, ProductA, ProductA, ProductB, ProductB, ProductC, ProductD];
      const uniqueSkus = new Set(products.map((prod) => prod.sku)).size;
      const expectedTotal = randomPrice * uniqueSkus;

      checkout.add(...products);

      expect(checkout.total()).toEqual(expectedTotal);
    });
  });

  describe('Realtime Price Updates', () => {
    // Checkout should display correct prices in realtime as items are added
    const unitsInGroup = {
      A: faker.random.number({ min: 2, max: 10 }),
      B: faker.random.number({ min: 2, max: 10 }),
    };
    const discounts = {
      // Should be <= price * quantity_in_group
      A: ProductA.price * unitsInGroup.A - faker.random.number({ min: 1, max: 20 }),
      B: ProductB.price * unitsInGroup.B - faker.random.number({ min: 1, max: 20 }),
    };
    const promos = {
      A: MakeSkuPromotion({
        skus: [ProductA.sku],
        discount: MakeGroupDiscount({ quantity: unitsInGroup.A, price: discounts.A }),
      }),
      B: MakeSkuPromotion({
        skus: [ProductB.sku],
        discount: MakeGroupDiscount({ quantity: unitsInGroup.B, price: discounts.B }),
      }),
    };
    const Strategies = Object.values(promos);
    it("When given products that don't require a strategy, it computes an accurate total", () => {
      const checkout = makeCheckout(Strategies);
      const products = [ProductA, ProductB, ProductC, ProductD];
      const expectedTotal = getProductsSubtotal(products);

      checkout.add(...products);

      expect(checkout.total()).toEqual(expectedTotal);
    });

    it('When Bs are added, it applies the correct discount', () => {
      const checkout = makeCheckout(Strategies);
      const expectedTotal = discounts.B;

      const initProducts = Array(unitsInGroup.B - 1).fill(ProductB);

      checkout.add(...initProducts);
      expect(checkout.total()).toEqual(ProductB.price * initProducts.length);

      checkout.add(ProductB);
      expect(checkout.total()).toEqual(expectedTotal);

      checkout.add(ProductB);
      expect(checkout.total()).toEqual(expectedTotal + ProductB.price);

      checkout.add(...initProducts);
      expect(checkout.total()).toEqual(expectedTotal * 2);
    });

    it('When As are added, it applies the correct discount', () => {
      const checkout = makeCheckout(Strategies);
      const expectedTotal = discounts.A;

      const initProducts = Array(unitsInGroup.A - 1).fill(ProductA);

      checkout.add(...initProducts);
      expect(checkout.total()).toEqual(ProductA.price * initProducts.length);

      checkout.add(ProductA);
      expect(checkout.total()).toEqual(expectedTotal);

      checkout.add(ProductA);
      expect(checkout.total()).toEqual(expectedTotal + ProductA.price);

      checkout.add(...initProducts);
      expect(checkout.total()).toEqual(expectedTotal * 2);
    });

    it('When As and Bs are added, it applies the correct discount', () => {
      const checkout = makeCheckout(Strategies);
      const expectedTotal = discounts.A + discounts.B;

      const initProductsA = Array(unitsInGroup.A - 1).fill(ProductA);
      const initProductsB = Array(unitsInGroup.B - 1).fill(ProductB);

      // Less than threshold
      checkout.add(...initProductsA, ...initProductsB);
      expect(checkout.total()).toEqual(
        ProductA.price * initProductsA.length + ProductB.price * initProductsB.length
      );

      // One at threshold, other is under
      checkout.add(ProductA);
      expect(checkout.total()).toEqual(discounts.A + ProductB.price * initProductsB.length);

      // Both At Threshold
      checkout.add(ProductB);
      expect(checkout.total()).toEqual(expectedTotal);

      // One at threshold, one is over
      checkout.add(ProductA);
      expect(checkout.total()).toEqual(expectedTotal + ProductA.price);

      // Both are over threshold, but under next multiple of threshold
      checkout.add(ProductB);
      expect(checkout.total()).toEqual(expectedTotal + ProductA.price + ProductB.price);

      // Both at multiple of threshold
      checkout.add(...initProductsA, ...initProductsB);
      expect(checkout.total()).toEqual(expectedTotal * 2);
    });
  });
});
