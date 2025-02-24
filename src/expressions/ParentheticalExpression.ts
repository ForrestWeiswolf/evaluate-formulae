import Expression from './Expression';

class ParentheticalExpression implements Expression {
  child?: Expression;

  closed: boolean;

  constructor(child?: Expression, closed = false) {
    if (child) {
      this.child = child;
    }
    this.closed = closed;
  }

  close(): ParentheticalExpression {
    return new ParentheticalExpression(this.child, true);
  }

  insert(node: Expression): Expression {
    if (this.closed) {
      return node.insert(this);
    }

    if (!this.child) {
      return new ParentheticalExpression(node);
    }
    return new ParentheticalExpression(this.child.insert(node));
  }

  evaluate(definitions: Record<string, number> = {}) {
    if (!this.child) {
      throw new Error('Attempted to evaluate empty parens');
    }
    return this.child.evaluate(definitions);
  }

  getVariables(): Set<string> {
    return this.child?.getVariables() || new Set();
  }
}

export default ParentheticalExpression;
