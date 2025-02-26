import Expression from './expressions/Expression';
import FunctionExpression from './expressions/FunctionExpression';
import NumericExpression from './expressions/NumericExpression';
import OperatorExpression from './expressions/OperatorExpression';
import ParentheticalExpression from './expressions/ParentheticalExpression';
import VariableExpression from './expressions/VariableExpression';
import operations from './operations';
import tokenize from './tokenize';

const expressionFromToken = (token: string) => {
  if (operations.includes(token)) {
    return new OperatorExpression(token);
  }
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
    } else if (tokens[i].includes('(')) {
      const functionName = tokens[i].slice(0, -1);
      tree = tree
        ? tree.insert(new FunctionExpression(functionName))
        : new FunctionExpression(functionName);
    } else if (tree instanceof ParentheticalExpression && tokens[i] === ')') {
      tree = tree.close();
    } else {
      tree = tree ? tree.insert(expressionFromToken(tokens[i])) : expressionFromToken(tokens[i]);
    }
  }

  return tree!;
};

export default expressionTreeFromString;
