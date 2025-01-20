interface Expression {
  add: (e: Expression) => Expression
  subtract: (e: Expression) => Expression
  multiply: (e: Expression) => Expression
  divide: (e: Expression) => Expression
  evaluate: () => number
}

export default Expression;
