import Expression from './Expression';

class VariableExpression implements Expression {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  evaluate(definitions: Record<string, number>) {
    if (definitions[this.name] === undefined) {
      throw new Error(`No definition for '${this.name}'`);
    }

    return definitions[this.name];
  }
}

export default VariableExpression;
