# Checkout Pricing System - Be Next Tech

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
