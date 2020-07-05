import { createMock } from 'ts-auto-mock';
import { Product } from 'product';

export const ProductA = createMock<Product>({ sku: 'A', price: 50 });
export const ProductB = createMock<Product>({ sku: 'B', price: 30 });
export const ProductC = createMock<Product>({ sku: 'C', price: 20 });
export const ProductD = createMock<Product>({ sku: 'D', price: 15 });
