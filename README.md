[![Work in Repl.it](https://classroom.github.com/assets/work-in-replit-14baed9a392b3a25080506f3b7b6d57f295ec2978f6f33ec97e36a161684cbe9.svg)](https://classroom.github.com/online_ide?assignment_repo_id=2896378&assignment_repo_type=AssignmentRepo)

# Getting started

## Dev Environment

Node.js >= 12.x

`yarn install`

`yarn test`

See `package.json > "scripts"` for more npm scripts you can run.

## Core Concepts

### Checkout

The top-level module that accomplishes the primary objective is `checkout.ts` via the `Checkout` class.
Its constructor accepts a `PriceChooser` (see `pricing.ts`) function that will choose the price to charge (among a list of possible `PriceOption`s) for each `Product` that is staged for checkout.

A `Product` (see `product.ts`) has a price and an sku. The info inside of `Product` objects is intended to be read-only. When staged for checkout, each product is turned into an `ItemInCart` (see `cart.ts`).
The amount the customer will be billed for the item is represented by the `amountToCharge` field, which is initialized to the regular unit price \* quantity.

The `amountToCharge` is directly dependent on the `PriceChooser` given to the `Checkout` constructor. Use `PricingStrategyFactory`s to generate these price choosers.

A `PriceOption` (see `pricing.ts`) optionally returns a price based on the product, its sku, and the entire cart. These are intended to implement discounts, promotions, and other product pricing that deviates from a product's normal unit price.

Any logic for selecting one price over another should be inside the `PriceChooser`, not the `Checkout::onItemAdded` hook.
Any actions, such as analytics, that run every time an item is added belong inside this hook. Price Selection is inside this hook byy default.

### Promotions

Each module with a default export in the `src/promotions` directory is considered a Promotion. Promotions should be typed as `PartialPricingStrategy` functions.

`promotions/templates` has helpers to assist the construction of promotions.

This submission has 2 active promotions: 2 B's for 45 & 3 A's for 130.

Note that these promotions are rebuilt inside of the checkout unit test so that the tests don't break once the promotions are discontinued.

## Future Improvements

Given more time, I would refactor the checkout unit tests to reduce redundancy.

The checkout interface would definitely change, its functionality is too limited right now.

I would also consider refactoring the `PriceChooser` parameters to only be an array of numbers.
I decided to keep it to support lazy loading the price choices, but I think that was a premature optimization. It performs logic that can/should be hoisted outside of it.

# Checkout Pricing System - Be Next Tech - Specs

## Objective

Implement the code for a checkout system that handles pricing schemes such as “apples cost 50 cents, three apples cost \$1.30"

## Description

Let’s implement the code for a supermarket checkout that calculates the total price of a number of items.
In a normal supermarket, things are identified using Stock Keeping Units, or SKUs.
Our goods are priced individually. In addition, some items are multi-priced: buy n of them, and they’ll cost you y cents.
For example, item ‘A’ might cost 50 cents individually, but this week we have a special offer: buy three ‘A’s and they’ll cost you \$1.30.
In fact this week’s prices are

| Item | Unit Price | Special Price |
| ---- | ---------- | ------------- |
| A    | 50         | 3 for 130     |
| B    | 30         | 2 for 45      |
| C    | 20         |               |
| D    | 15         |               |

Our checkout should accept items in any order, so that if we scan a B, an A, and another B,
we’ll recognize the two B’s and price them at 45 (for a total price so far of 95).

## Setup and Implementation

You may structure your implementation and interfaces in any way that achieves the objective.

Existing code is just to get you started.

For instance: By default, strings (representing item SKUs) are used to represent items. You may wish to change this.

You are highly encouraged to write your own unit tests/test suite as well.

Please adhere to the same practices that you would as a professional.

## Tooling

For accessibility, you may work on this via the online editor REPL.it if you prefer.

You may also use and configure any tooling you deem appropriate, including entirely different programming languages and runtimes.
If you do choose to do this, please make sure that your submission works as expected in REPL.it (because that is where it will be run/tested).

The project is initially setup as a Typescript project that uses Jest for testing.
