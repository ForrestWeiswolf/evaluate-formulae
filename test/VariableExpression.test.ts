import VariableExpression from '../src/calculator/VariableExpression';

it('evaluates to the value matching the name was constructed with', () => {
  const expression = new VariableExpression('foo');
  expect(expression.evaluate({ foo: 7, bar: 8 })).toBe(7);
});
