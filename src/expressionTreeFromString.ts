import Expression from './Expression';
import NumericExpression from './NumericExpression';
import OperatorExpression from './OperatorExpression';
import VariableExpression from './VariableExpression';
import tokenize from './tokenize';

export const operations = ['^', '*', '/', '+', '-'];

const expressionFromToken = (token: string) => {
  // todo: handle negative numbers
  if (/\d+/.exec(token)) {
    return new NumericExpression(parseFloat(token));
  }

  return new VariableExpression(token);
};

const expressionTreeFromString = (expression: string) => {
  const tokens = tokenize(expression);
  let tree: Expression = expressionFromToken(tokens[0]);

  // Note that this loop starts at 1
  for (let i = 1; i < tokens.length; i++) {
    if (!operations.includes(tokens[i]) && tree instanceof OperatorExpression) {
      tree = tree.insert(expressionFromToken(tokens[i]));
    } else {
      tree = tree.insert(new OperatorExpression(tokens[i]));
    }
  }

  return tree;
};

export default expressionTreeFromString;
