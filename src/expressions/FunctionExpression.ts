import { FunctionDefinitions } from '../types';
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

  evaluate(definitions: Record<string, number> = {}, functions?: FunctionDefinitions) {
    if (!this.child) {
      throw new Error('Attempted to evaluate empty parens');
    }
    if (!functions || !functions[this.name]) {
      throw new Error(`No definition for function '${this.name}'`);
    }
    return functions[this.name](this.child.evaluate(definitions, functions));
  }
}

export default FunctionExpression;
