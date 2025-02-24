interface Expression {
  evaluate: (
    variables: Record<string, number>, functions?: Record<string, (arg: number) => number>
  ) => number
  insert: (node: Expression) => Expression
  getVariables: () => Set<string>
}

export default Expression;
