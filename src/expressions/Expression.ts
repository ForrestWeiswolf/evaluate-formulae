import { FunctionDefinitions } from '../types';

interface Expression {
  evaluate: (
    variables: Record<string, number>, functions?: FunctionDefinitions
  ) => number
  insert: (node: Expression) => Expression
  getVariables: () => Set<string>
}

export default Expression;
