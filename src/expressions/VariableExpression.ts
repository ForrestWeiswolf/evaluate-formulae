import Expression from './Expression';
import OperatorExpression from './OperatorExpression';

class VariableExpression implements Expression {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  insert(node: Expression): OperatorExpression {
    if (node instanceof OperatorExpression) {
      return new OperatorExpression(node.operation, [new VariableExpression(this.name)]);
    }

    throw new Error(`Inserting a ${node.constructor.name} after a VariableExpression is not supported`);
  }

  evaluate(definitions: Record<string, number>) {
    if (definitions[this.name] === undefined) {
      throw new Error(`No definition for '${this.name}'`);
    }

    return definitions[this.name];
  }

  getVariables(): Set<string> {
    return new Set([this.name]);
  }
}

export default VariableExpression;
