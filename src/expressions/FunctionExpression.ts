import Expression from './Expression';
import ParentheticalExpression from './ParentheticalExpression';

class FunctionExpression extends ParentheticalExpression {
  name: string;

  constructor(name: string, child?: Expression, closed: boolean = false) {
    super(child, closed);
    this.name = name;
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
}

export default FunctionExpression;
