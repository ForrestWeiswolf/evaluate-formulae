import Expression from './Expression';

class OperatorExpression implements Expression {
  operation: string;

  children: Expression[];

  constructor(operation: string, children: Expression[]) {
    this.operation = operation;
    this.children = children;
  }

  evaluate(): number {
    switch (this.operation) {
      case '+':
        return this.children[0].evaluate() + this.children[1].evaluate();
      case '-':
        return this.children[0].evaluate() - this.children[1].evaluate();
      case '*':
        return this.children[0].evaluate() * this.children[1].evaluate();
      case '/':
        return this.children[0].evaluate() / this.children[1].evaluate();
      case '^':
        return this.children[0].evaluate() ** this.children[1].evaluate();
      default:
        return NaN;
    }
  }
}

export default OperatorExpression;
