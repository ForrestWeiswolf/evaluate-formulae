import Expression from './Expression';

class NumericExpression implements Expression {
  value: number;

  constructor(n: number) {
    this.value = n;
  }

  evaluate() {
    return this.value;
  }
}

export default NumericExpression;
