import faker from 'faker';
import { createMock } from 'ts-auto-mock';
import { MakeGroupDiscount } from './discounts/group';
import { ItemInCart } from 'cart';

describe('Promotion Discount Helpers', () => {
  describe('Apply a Group Discount (3 for 130)', () => {
    const UNITS_IN_GROUP = 3;
    const DISCOUNT_PRICE = 130;
    const discount = MakeGroupDiscount({ quantity: UNITS_IN_GROUP, price: DISCOUNT_PRICE });
    it('When item quantity is less than the threshold, it does not apply the discount', () => {
      const price = faker.random.number({ min: 1, max: 100 });
      const quantity = faker.random.number({ min: 1, max: 2 });
      const mockItem = createMock<ItemInCart>({
        quantity,
        product: { price },
      });

      const discountPrice = discount({
        item: mockItem,
        sku: '',
        cart: new Map(),
      });

      expect(discountPrice).toEqual(price * quantity);
    });

    it('When item quantity is equal to the threshold, it applies the discount', () => {
      const price = faker.random.number({ min: 1, max: 100 });
      const quantity = UNITS_IN_GROUP;
      const mockItem = createMock<ItemInCart>({
        quantity,
        product: { price },
      });

      const discountPrice = discount({
        item: mockItem,
        sku: '',
        cart: new Map(),
      });

      expect(discountPrice).toEqual(DISCOUNT_PRICE);
    });

    it('When item quantity is equal to positive multiples of the threshold, it applies the discount evenly', () => {
      const price = faker.random.number({ min: 1, max: 100 });
      const groups = faker.random.number({ min: 1, max: 100 });
      const quantity = UNITS_IN_GROUP * groups;
      const mockItem = createMock<ItemInCart>({
        quantity,
        product: { price },
      });

      const discountPrice = discount({
        item: mockItem,
        sku: '',
        cart: new Map(),
      });

      expect(discountPrice).toEqual(DISCOUNT_PRICE * groups);
    });

    it('When item quantity has group(s) of threshold and leftover items, it applies the discount only to whole groups', () => {
      const price = faker.random.number({ min: 1, max: 100 });
      const groups = faker.random.number({ min: 1, max: 100 });
      const leftovers = faker.random.number({ min: 0, max: UNITS_IN_GROUP - 1 });
      const quantity = UNITS_IN_GROUP * groups + leftovers;
      const mockItem = createMock<ItemInCart>({
        quantity,
        product: { price },
      });

      const discountPrice = discount({
        item: mockItem,
        sku: '',
        cart: new Map(),
      });

      expect(discountPrice).toEqual(DISCOUNT_PRICE * groups + leftovers * price);
    });
  });
});
