import Expression from './Expression';

class ParentheticalExpression implements Expression {
  child?: Expression;

  constructor(child?: Expression) {
    if (child) {
      this.child = child;
    }
  }

  insert(node: Expression): ParentheticalExpression {
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
