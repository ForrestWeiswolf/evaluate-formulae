import NumericExpression from '../src/calculator/NumericExpression';

it('evaluates to the value it was constructed with', () => {
  const expression = new NumericExpression(7);
  expect(expression.evaluate()).toBe(7);
});
