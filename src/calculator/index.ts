import Expression from './Expression';
import NumericExpression from './NumericExpression';
import OperatorExpression from './OperatorExpression';
import tokenize from './tokenize';
import VariableExpression from './VariableExpression';

export const operations = ['^', '*', '/', '+', '-'];

const numericOrVariableExpression = (token: string) => {
  // todo: handle negative numbers
  if (/\d+/.exec(token)) {
    return new NumericExpression(parseFloat(token));
  }

  return new VariableExpression(token);
};

const expressionTreeFromString = (expression: string) => {
  const tokens = tokenize(expression);
  let tree: Expression = numericOrVariableExpression(tokens[0]);
  let workingLeaf = tree;

  // Note that this loop starts at 1
  for (let i = 1; i < tokens.length; i++) {
    // TODO: refactor to put an insert operation on the Expression classes
    // instead of having all this logic here?
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
        .children.push(numericOrVariableExpression(tokens[i]));
    } else {
      tree = new OperatorExpression(tokens[i], [tree]);
      workingLeaf = tree;
    }
  }

  return tree;
};

const evaluateExpression = (expression: string, variables: Record<string, number> = {}): number => {
  const tree = expressionTreeFromString(expression);

  return tree.evaluate(variables);
};

export default evaluateExpression;
