# evaluate-formulae

The `evaluateFormulae` function takes an object where the values are mathematical expressions represented as strings, evaluates each expression, and returns a new object with the same keys but with the expressions replaced by their calculated numerical results. Expressions may reference the evaluated results of other expressions as variables, and may use custom functions passed in as an optional second argument.

Example:

```javascript
const result = evaluateFormulae(
  {
    a: '5*2*',
    b: 'a+1',
    c: 'double(b)'
  },
  {
    double: (x) => x * 2
  }
);
// result: { a: 10, b: 11, c: 22 }
```