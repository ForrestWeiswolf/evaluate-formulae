import NumericExpression from '../../src/expressions/NumericExpression';
import OperatorExpression from '../../src/expressions/OperatorExpression';

it('evaluates to the value it was constructed with', () => {
  const expression = new NumericExpression(7);
  expect(expression.evaluate()).toBe(7);
});

it('makes an OperatorExpression makes the new root when insert is called with one', () => {
  const expression = new NumericExpression(7);

  expect(expression.insert(new OperatorExpression('*'))).toEqual(new OperatorExpression('*', [expression]));
});

it('getVariables returns empty set', () => {
  const expression = new NumericExpression(7);

  expect(expression.getVariables()).toEqual(new Set());
});
