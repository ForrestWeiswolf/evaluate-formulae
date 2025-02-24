import Expression from './Expression';
import OperatorExpression from './OperatorExpression';

class NumericExpression implements Expression {
  value: number;

  constructor(n: number) {
    this.value = n;
  }

  insert(node: Expression): OperatorExpression {
    if (node instanceof OperatorExpression) {
      return new OperatorExpression(node.operation, [new NumericExpression(this.value)]);
    }

    throw new Error(`Inserting a ${node.constructor.name} after a NumericExpression is not supported`);
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
