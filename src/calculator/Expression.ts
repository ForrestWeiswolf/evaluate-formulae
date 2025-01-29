interface Expression {
  evaluate: (definitions: Record<string, number>) => number
}

export default Expression;
