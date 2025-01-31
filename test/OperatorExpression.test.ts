import NumericExpression from '../src/calculator/NumericExpression';
import OperatorExpression from '../src/calculator/OperatorExpression';
import VariableExpression from '../src/calculator/VariableExpression';

describe('arithmetic with numeric expressions', () => {
  it('if constructed with the + operator, evaluates to the result of adding two NumericExpressions', () => {
    const expression = new OperatorExpression('+', [
      new NumericExpression(1),
      new NumericExpression(2),
    ]);
    expect(expression.evaluate({})).toBe(3);
  });

  it('if constructed with the - operator, evaluevaluates to the result of subtracting two NumericExpressions', () => {
    const expression = new OperatorExpression('-', [
      new NumericExpression(1),
      new NumericExpression(2),
    ]);
    expect(expression.evaluate({})).toBe(-1);
  });

  it('if constructed with the * operator, evaluates to the result of multiplying two NumericExpressions', () => {
    const expression = new OperatorExpression('*', [
      new NumericExpression(2),
      new NumericExpression(2),
    ]);
    expect(expression.evaluate({})).toBe(4);
  });

  it('if constructed with the / operator, evaluates to the result of dividing two NumericExpressions', () => {
    const expression = new OperatorExpression('/', [
      new NumericExpression(6),
      new NumericExpression(2),
    ]);
    expect(expression.evaluate({})).toBe(3);
  });
});

it('passes along variable definitions to VariableExpression children', () => {
  const expression = new OperatorExpression('+', [
    new VariableExpression('foo'),
    new VariableExpression('bar'),
  ]);
  expect(expression.evaluate({ foo: 1, bar: 2 })).toBe(3);
});

it('passes along variable definitions to OperatorExpression children', () => {
  const expression = new OperatorExpression('+', [
    new VariableExpression('foo'),
    new OperatorExpression('*', [new VariableExpression('bar'), new NumericExpression(2)]),
  ]);
  expect(expression.evaluate({ foo: 1, bar: 2 })).toBe(5);
});
