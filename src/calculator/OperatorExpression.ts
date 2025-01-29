import Expression from './Expression';

class OperatorExpression implements Expression {
  operation: string;

  children: Expression[];

  constructor(operation: string, children: Expression[]) {
    this.operation = operation;
    this.children = children;
  }

  evaluate(definitions: Record<string, number>): number {
    switch (this.operation) {
      case '+':
        return this.children[0].evaluate(definitions) + this.children[1].evaluate(definitions);
      case '-':
        return this.children[0].evaluate(definitions) - this.children[1].evaluate(definitions);
      case '*':
        return this.children[0].evaluate(definitions) * this.children[1].evaluate(definitions);
      case '/':
        return this.children[0].evaluate(definitions) / this.children[1].evaluate(definitions);
      case '^':
        return this.children[0].evaluate(definitions) ** this.children[1].evaluate(definitions);
      default:
        return NaN;
    }
  }
}

export default OperatorExpression;
