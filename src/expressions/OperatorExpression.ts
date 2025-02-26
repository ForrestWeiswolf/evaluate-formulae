import type Expression from './Expression';
import operations from '../operations';
import ParentheticalExpression from './ParentheticalExpression';
import { FunctionDefinitions } from '../types';

class OperatorExpression implements Expression {
  operation: string;

  children: Expression[];

  constructor(operation: string, children: Expression[] = []) {
    if (!operations.includes(operation)) {
      throw new Error(`Cannot create OperatorExpression - "${operation}" is not a known operator`);
    }
    this.operation = operation;
    this.children = children;
  }

  insert(node: Expression): OperatorExpression {
    // todo: make sure everything deep copies?
    if (this.children[1] instanceof ParentheticalExpression) {
      return new OperatorExpression(this.operation, [
        this.children[0], this.children[1].insert(node),
      ]);
    }

    if (node instanceof OperatorExpression) {
      if (operations.indexOf(this.operation) <= operations.indexOf(node.operation)) {
        return new OperatorExpression(node.operation, [
          new OperatorExpression(this.operation, [...this.children]),
        ]);
      }
      return new OperatorExpression(this.operation, [
        this.children[0], node.insert(this.children[1]!),
      ]);
    }

    if (this.children[1] instanceof OperatorExpression) {
      return new OperatorExpression(this.operation, [
        this.children[0], this.children[1].insert(node),
      ]);
    }
    return new OperatorExpression(this.operation, [...this.children, node]);
  }

  evaluate(variables: Record<string, number>, functions: FunctionDefinitions = {}): number {
    switch (this.operation) {
      case '+':
        return this.children[0].evaluate(variables, functions)
          + this.children[1].evaluate(variables, functions);
      case '-':
        return this.children[0].evaluate(variables, functions)
          - this.children[1].evaluate(variables, functions);
      case '*':
        return this.children[0].evaluate(variables, functions)
          * this.children[1].evaluate(variables, functions);
      case '/':
        return this.children[0].evaluate(variables, functions)
          / this.children[1].evaluate(variables, functions);
      case '^':
        return this.children[0].evaluate(variables, functions)
          ** this.children[1].evaluate(variables, functions);
      default:
        return NaN;
    }
  }

  getVariables(): Set<string> {
    return new Set([...this.children[0].getVariables(), ...this.children[1].getVariables()]);
  }
}

export default OperatorExpression;
