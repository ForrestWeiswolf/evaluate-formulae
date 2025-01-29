import Expression from './Expression';

class VariableExpression implements Expression {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  evaluate(definitions: Record<string, number>) {
    return definitions[this.name];
  }
}

export default VariableExpression;
