interface Expression {
  evaluate: (definitions: Record<string, number>) => number
  insert: (node: Expression) => Expression
  getVariables: () => Set<string>
}

export default Expression;
