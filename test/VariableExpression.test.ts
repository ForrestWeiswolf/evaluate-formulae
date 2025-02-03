import OperatorExpression from '../src/calculator/OperatorExpression';
import VariableExpression from '../src/calculator/VariableExpression';

it('evaluates to the value matching the name was constructed with', () => {
  const expression = new VariableExpression('foo');
  expect(expression.evaluate({ foo: 7, bar: 8 })).toBe(7);
});

it('makes an OperatorExpression makes the new root when insert is called with one', () => {
  const expression = new VariableExpression('foo');

  expect(expression.insert(new OperatorExpression('*'))).toEqual(new OperatorExpression('*', [expression]));
});
