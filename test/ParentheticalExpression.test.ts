import ParentheticalExpression from '../src/ParentheticalExpression';
import NumericExpression from '../src/NumericExpression';
import VariableExpression from '../src/VariableExpression';
import OperatorExpression from '../src/OperatorExpression';

it('evaluates to its child\'s value', () => {
  const expression = new ParentheticalExpression(new NumericExpression(7));
  expect(expression.evaluate()).toBe(7);
});

it('passes definitions to its child\'s evaluate', () => {
  const expression = new ParentheticalExpression(new VariableExpression('a'));
  expect(expression.evaluate({ a: 2 })).toBe(2);
});

it('getVariables returns child\'s variables', () => {
  const expression = new ParentheticalExpression(new VariableExpression('a'));

  expect(expression.getVariables()).toEqual(new Set(['a']));
});

describe('insert', () => {
  it('inserts node as child if it had none', () => {
    const expression = new ParentheticalExpression();

    expect(expression.insert(new NumericExpression(1)))
      .toEqual(new ParentheticalExpression(new NumericExpression(1)));
  });

  it('replaces child with result of calling child\'s insert', () => {
    const expression = new ParentheticalExpression(new OperatorExpression('+'));

    expect(expression.insert(new NumericExpression(1))).toEqual(
      new ParentheticalExpression(new OperatorExpression('+', [new NumericExpression(1)])),
    );
  });
});
