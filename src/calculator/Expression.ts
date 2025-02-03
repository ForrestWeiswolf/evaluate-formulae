interface Expression {
  evaluate: (definitions: Record<string, number>) => number
  insert: (node: Expression) => Expression
}

export default Expression;
