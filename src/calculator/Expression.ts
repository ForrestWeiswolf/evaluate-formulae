import OperatorExpression from './OperatorExpression';

interface Expression {
  evaluate: (definitions: Record<string, number>) => number
  insert: (node: OperatorExpression) => Expression
}

export default Expression;
