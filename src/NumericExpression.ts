import Expression from './Expression';
import OperatorExpression from './OperatorExpression';

class NumericExpression implements Expression {
  value: number;

  constructor(n: number) {
    this.value = n;
  }

  insert(node: OperatorExpression): OperatorExpression {
    return new OperatorExpression(node.operation, [new NumericExpression(this.value)]);
  }

  evaluate() {
    return this.value;
  }

  // eslint-disable-next-line class-methods-use-this
  getVariables(): Set<string> {
    return new Set();
  }
}

export default NumericExpression;
