import NumericExpression from '../src/NumericExpression';
import OperatorExpression from '../src/OperatorExpression';
import VariableExpression from '../src/VariableExpression';
import ParentheticalExpression from '../src/ParentheticalExpression';

describe('evaluate', () => {
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
});

describe('insert', () => {
  describe('with less than two children', () => {
    it('inserts a numeric expression as child if it has no children', () => {
      const operatorExpression = new OperatorExpression('+');

      expect(operatorExpression.insert(new NumericExpression(1))).toEqual(
        new OperatorExpression('+', [new NumericExpression(1)]),
      );
    });

    it('inserts a numeric expression as second child if it has one child', () => {
      const operatorExpression = new OperatorExpression('+', [new NumericExpression(2)]);

      expect(operatorExpression.insert(new NumericExpression(1))).toEqual(
        new OperatorExpression('+', [new NumericExpression(2), new NumericExpression(1)]),
      );
    });

    it('inserts a variable expression as second child if it has one child', () => {
      const operatorExpression = new OperatorExpression('+', [new NumericExpression(2)]);

      expect(operatorExpression.insert(new VariableExpression('foo'))).toEqual(
        new OperatorExpression('+', [new NumericExpression(2), new VariableExpression('foo')]),
      );
    });

    it('inserts a parenthetical expression as second child if it has one child', () => {
      const operatorExpression = new OperatorExpression('+', [new NumericExpression(2)]);

      expect(
        operatorExpression.insert(new ParentheticalExpression(new NumericExpression(1))),
      ).toEqual(
        new OperatorExpression('+', [new NumericExpression(2), new ParentheticalExpression(new NumericExpression(1))]),
      );
    });
  });

  describe('with two children', () => {
    it('inserts a higher-priority operator expression as second child, inserting existing second child on it', () => {
      // e.g during 1+2^...
      const plusExpression = new OperatorExpression('+', [new NumericExpression(1), new NumericExpression(2)]);
      const powerExpression = new OperatorExpression('^');

      expect(plusExpression.insert(powerExpression)).toEqual(
        new OperatorExpression('+', [
          new NumericExpression(1),
          new OperatorExpression('^', [new NumericExpression(2)]),
        ]),
      );
    });

    it('inserts a lower-precedence operator expression as new root', () => {
      // e.g during 2^3+...
      const powerExpression = new OperatorExpression('^', [new NumericExpression(2), new NumericExpression(3)]);
      const plusExpression = new OperatorExpression('+');

      expect(powerExpression.insert(plusExpression)).toEqual(
        new OperatorExpression('+', [
          new OperatorExpression('^', [new NumericExpression(2), new NumericExpression(3)]),
        ]),
      );
    });

    it('inserts an equal-precedence operator expression as new root', () => {
      // e.g during 3-2-...
      const powerExpression = new OperatorExpression('-', [
        new NumericExpression(3), new NumericExpression(2),
      ]);
      const plusExpression = new OperatorExpression('-');

      expect(powerExpression.insert(plusExpression)).toEqual(
        new OperatorExpression('-', [
          new OperatorExpression('-', [new NumericExpression(3), new NumericExpression(2)]),
        ]),
      );
    });

    describe('when second child is an operator expression', () => {
      it('inserts a numeric expression on its last child', () => {
        // e.g during 1+2*3
        const expression = new OperatorExpression('*', [
          new NumericExpression(1), new OperatorExpression('*', [
            new NumericExpression(2),
          ])]);

        expect(expression.insert(new NumericExpression(3))).toEqual(
          new OperatorExpression('*', [
            new NumericExpression(1), new OperatorExpression('*', [
              new NumericExpression(2),
              new NumericExpression(3),
            ])]),
        );
      });
    });

    describe('when second child is an unclosed parenthetical expression', () => {
      it('inserts a numeric expression on its last child', () => {
        // e.g during 3*(2+1)
        const expression = new OperatorExpression('*', [
          new NumericExpression(3), new ParentheticalExpression(new NumericExpression(2)),
        ]);

        expect(expression.insert(new OperatorExpression('+'))).toEqual(
          new OperatorExpression('*', [
            new NumericExpression(3),
            new ParentheticalExpression(new OperatorExpression('+', [new NumericExpression(2)])),
          ]),
        );
      });
    });
  });

  // Scenarios I believe won't happen:
  // Inserting a numeric / variable expression when less than two children
  // Inserting an operator expression when less than two children
  // Inserting an operator expression that has children
  // TODO: confirm these, and if so make it throw a 'not supported' error
  // and/or rearrange the code to make it obvious that these cases won't occur
});

describe('getVariables', () => {
  it('returns Set of all children\'s variables', () => {
    const expression = new OperatorExpression('+', [
      new VariableExpression('foo'),
      new OperatorExpression('*', [new VariableExpression('bar'), new VariableExpression('foo')]),
    ]);

    expect(expression.getVariables()).toEqual(new Set(['foo', 'bar']));
  });
});
