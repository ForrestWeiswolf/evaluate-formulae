import Expression from './Expression';

class FunctionExpression implements Expression {
  child?: Expression;

  name: string;

  private closed: boolean;

  constructor(name: string, child?: Expression, closed: boolean = false) {
    this.name = name;
    if (child) {
      this.child = child;
    }
    this.closed = closed;
  }

  close(): FunctionExpression {
    return new FunctionExpression(this.name, this.child, true);
  }

  insert(node: Expression): Expression {
    if (this.closed) {
      return node.insert(this);
    }

    if (!this.child) {
      return new FunctionExpression(this.name, node);
    }
    return new FunctionExpression(this.name, this.child.insert(node));
  }

  evaluate(
    definitions: Record<string, number> = {},
    functions?: Record<string, (arg: number) => number>,
  ) {
    if (!this.child) {
      throw new Error('Attempted to evaluate empty parens');
    }
    return functions![this.name](this.child.evaluate(definitions));
  }

  getVariables(): Set<string> {
    return this.child?.getVariables() || new Set();
  }
}

export default FunctionExpression;
