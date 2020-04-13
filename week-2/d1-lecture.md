# Lecture - Testing

- {} => list of properties on a given subject , [] => list of independent items
- mocha is a test runner
- `npm install -D mocha chai` (works the same as --save-dev)
- chai is the test library
- mocha is the test runner

- `const cleanedTotal = Math.floor(total * 100) / 100`
for pricing in online shopping

### Key Caracteristics of Good Unit Tests

- Unit tests should be isolated

  - Tests should not rely on external data
  - Keeps the tests consistent
  - Tests should not fail because of external factors

- Unit tests should be fast

- Tests should not produce side-effects