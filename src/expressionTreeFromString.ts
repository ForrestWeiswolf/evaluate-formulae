import Expression from './Expression';
import NumericExpression from './NumericExpression';
import OperatorExpression from './OperatorExpression';
import ParentheticalExpression from './ParentheticalExpression';
import VariableExpression from './VariableExpression';
import operations from './operations';
import tokenize from './tokenize';

const expressionFromToken = (token: string) => {
  if (/\d+/.exec(token)) {
    return new NumericExpression(parseFloat(token));
  }

  return new VariableExpression(token);
};

const expressionTreeFromString = (expression: string): Expression => {
  const tokens = tokenize(expression);
  let tree: Expression | null = null;

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '(') {
      tree = tree ? tree.insert(new ParentheticalExpression()) : new ParentheticalExpression();
    } else if (!operations.includes(tokens[i]) && tree instanceof OperatorExpression) {
      tree = tree.insert(expressionFromToken(tokens[i]));
    } else if (tree instanceof ParentheticalExpression && tokens[i] === ')') {
      tree = tree.close();
    } else {
      tree = tree ? tree.insert(new OperatorExpression(tokens[i])) : expressionFromToken(tokens[0]);
    }
  }

  return tree!;
};

export default expressionTreeFromString;
