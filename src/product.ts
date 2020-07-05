/** Stock keeping unit. Type alias for string. Intended to clarify what the string should reference when composing other types */
export type SKU = string;

export interface HasSku {
  sku: SKU;
}

export interface Product extends HasSku {
  price: number;
}
