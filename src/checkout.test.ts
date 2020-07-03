/**
 * Includes a few tests to get you started.
 */
import { CheckoutInterface } from "./checkout";

function makeCheckout(): CheckoutInterface {
  // TODO implement this function to arrange and return a default checkout object for tests
  return null;
}

describe("Checkout Pricing", () => {
  describe("Calculate Product Prices", () => {
    it("When given products that don't require a strategy, it computes an accurate total", () => {
      const checkout = makeCheckout();
      const expectedTotal = 115;

      checkout.add("A", "B", "C", "D");

      expect(checkout.total()).toEqual(expectedTotal);
    });

    it("When 2 Bs are added, it applies the correct discount", () => {
      const checkout = makeCheckout();
      const expectedTotal = 45;

      checkout.add("B", "B");

      expect(checkout.total()).toEqual(expectedTotal);
    });

    it("When 3 As are added, it applies the correct discount", () => {
      const checkout = makeCheckout();
      const expectedTotal = 130;

      checkout.add("A", "A", "A");

      expect(checkout.total()).toEqual(expectedTotal);
    });
  });
});
