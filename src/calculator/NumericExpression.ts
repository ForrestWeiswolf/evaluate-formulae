import Expression from './Expression';

class NumericExpression implements Expression {
  value: number;

  constructor(n: number) {
    this.value = n;
  }

  evaluate() {
    return this.value;
  }

  add(e: Expression) { return new NumericExpression(this.evaluate() + e.evaluate()); }

  subtract(e: Expression) { return new NumericExpression(this.evaluate() - e.evaluate()); }

  multiply(e: Expression) {
    return new NumericExpression(this.evaluate() * e.evaluate());
  }

  divide(e: Expression) { return new NumericExpression(this.evaluate() / e.evaluate()); }
}

export default NumericExpression;
