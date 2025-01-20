import Expression from './Expression';
import NumericExpression from './NumericExpression';

class OperatorExpression implements Expression {
  operation: string;

  children: Expression[];

  constructor(operation: string, children: Expression[]) {
    this.operation = operation;
    this.children = children;
  }

  add(e: Expression) { return new NumericExpression(this.evaluate() + e.evaluate()); }

  subtract(e: Expression) { return new NumericExpression(this.evaluate() - e.evaluate()); }

  multiply(e: Expression) { return new NumericExpression(this.evaluate() * e.evaluate()); }

  divide(e: Expression) { return new NumericExpression(this.evaluate() / e.evaluate()); }

  evaluate(): number {
    switch (this.operation) {
      case '+':
        return this.children[0].add(this.children[1]).evaluate();
      case '-':
        return this.children[0].subtract(this.children[1]).evaluate();
      case '*':
        return this.children[0].multiply(this.children[1]).evaluate();
      case '/':
        return this.children[0].divide(this.children[1]).evaluate();
      default:
        return NaN;
    }
  }
}

export default OperatorExpression;
