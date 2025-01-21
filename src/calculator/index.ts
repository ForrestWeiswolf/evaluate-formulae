import Expression from './Expression';
import NumericExpression from './NumericExpression';
import OperatorExpression from './OperatorExpression';

export const operations = ['^', '*', '/', '+', '-'];

// TODO: pull this out to another file?
const tokenize = (expression: string) => {
  const result = [];
  let token = '';
  for (let i = 0; i < expression.length; i++) {
    if (/[\d,]/.exec(expression[i])) {
      token += expression[i];
    } else if (/\w/.exec(expression[i])) {
      token += expression[i];
    } else {
      result.push(token, expression[i]);
      token = '';
    }
  }
  result.push(token);

  return result;
};

const numericExpressionFrom = (token: string, variables: Record<string, number>) => (
  new NumericExpression(/\d+/.exec(token)
    ? parseFloat(token)
    : variables[token])
);

const evaluateExpression = (expression: string, variables: Record<string, number> = {}): number => {
  const tokens = tokenize(expression);
  let tree: Expression = numericExpressionFrom(tokens[0], variables);
  let workingLeaf = tree;

  // Note that this loop starts at 1
  for (let i = 1; i < tokens.length; i++) {
    if (tree instanceof OperatorExpression && operations.includes(tokens[i])) {
      const leaf = (workingLeaf as OperatorExpression);
      if (operations.indexOf(leaf.operation) > operations.indexOf(tokens[i])) {
        const lastChild = leaf.children.pop();
        leaf.children.push(new OperatorExpression(tokens[i], [lastChild!]));
        workingLeaf = leaf.children[leaf.children.length - 1];
      } else {
        tree = new OperatorExpression(tokens[i], [tree]);
      }
    } else if (tree instanceof OperatorExpression) {
      (tree.children.length === 1 ? tree : workingLeaf as OperatorExpression)
        .children.push(numericExpressionFrom(tokens[i], variables));
    } else {
      tree = new OperatorExpression(tokens[i], [tree]);
      workingLeaf = tree;
    }
  }

  return tree.evaluate();
};

export default evaluateExpression;
