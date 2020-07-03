/**
 * Add your checkout implementation to this file
 *
 * You can change any interfaces and types included by default as long as your
 * implementation achieves the goal specified in the README.
 *
 * Feel free to ask any questions you have.
 */

type SKU = string;

/**
 * Interface that your checkout implementation should conform to
 */
export interface CheckoutInterface {
  add(...skus: SKU[]): unknown;
  total(): number;
}
