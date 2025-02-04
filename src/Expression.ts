import type OperatorExpression from './OperatorExpression';

interface Expression {
  evaluate: (definitions: Record<string, number>) => number
  insert: (node: OperatorExpression) => Expression
  getVariables: () => Set<string>
}

export default Expression;
