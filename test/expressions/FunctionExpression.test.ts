import FunctionExpression from '../../src/expressions/FunctionExpression';
import NumericExpression from '../../src/expressions/NumericExpression';
import VariableExpression from '../../src/expressions/VariableExpression';
import OperatorExpression from '../../src/expressions/OperatorExpression';

it('calls the function matching the name on child\'s value', () => {
  const expression = new FunctionExpression('foo', new NumericExpression(7));
  const spy = jest.fn(() => 14);
  expect(expression.evaluate({}, { foo: spy })).toBe(14);
  expect(spy).toHaveBeenCalledWith(7);
});

it('throws an error if no function matching the name is provided', () => {
  const expression = new FunctionExpression('foo', new NumericExpression(7));
  expect(() => expect(expression.evaluate({}, {}))).toThrow("No definition for function 'foo'");
});

it('passes along variable and function definitions to child', () => {
  const evaluateSpy = jest.spyOn(OperatorExpression.prototype, 'evaluate');

  const definitions = { variables: { a: 1, b: 2 }, functions: { foo: () => 2 } };
  const expression = new FunctionExpression('foo', new OperatorExpression('+', [
    new NumericExpression(1), new NumericExpression(2),
  ]));

  expression.evaluate(definitions.variables, definitions.functions);

  expect(evaluateSpy).toHaveBeenCalledWith(definitions.variables, definitions.functions);
});

it('getVariables returns child\'s variables', () => {
  const expression = new FunctionExpression('foo', new VariableExpression('a'));

  expect(expression.getVariables()).toEqual(new Set(['a']));
});

describe('insert', () => {
  describe('when open', () => {
    it('inserts node as child if it had none', () => {
      const expression = new FunctionExpression('foo');

      expect(expression.insert(new NumericExpression(1)))
        .toEqual(new FunctionExpression('foo', new NumericExpression(1)));
    });

    it('replaces child with result of calling child\'s insert', () => {
      const expression = new FunctionExpression('foo', new OperatorExpression('+'));

      const expected = new FunctionExpression('foo', new OperatorExpression('+', [new NumericExpression(1)]));
      expect(expression.insert(new NumericExpression(1))).toEqual(expected);
    });
  });

  describe('when closed', () => {
    it('inserts an OperatorExpression as new root', () => {
      // (1)+...
      const expression = new FunctionExpression('foo', new NumericExpression(1));

      const expected = new OperatorExpression('+', [
        new FunctionExpression('foo', new NumericExpression(1), true),
      ]);

      expect(expression.close().insert(new OperatorExpression('+'))).toEqual(expected);
    });

    // TODO: error if inserting a numeric when closed
  });
});
