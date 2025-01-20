import Expression from './Expression';
import NumericExpression from './NumericExpression';
import OperatorExpression from './OperatorExpression';

// TODO: reconsider file name

export const operations = ['*', '/', '+', '-'];

const tokenize = (expression: string) => {
  const result = [];
  let token = '';
  for (let i = 0; i < expression.length; i++) {
    if (/[\d,.]/.exec(expression[i])) {
      token += expression[i];
    } else {
      result.push(token, expression[i]);
      token = '';
    }
  }
  result.push(token);

  return result;
};

const evaluateExpression = (expression: string): number => {
  const tokens = tokenize(expression);
  let tree: Expression = new NumericExpression(parseFloat(tokens[0]));
  let workingLeaf = tree;

  for (let i = 1; i < tokens.length; i++) {
    if (tree instanceof NumericExpression) {
      tree = new OperatorExpression(tokens[i], [tree]);
      workingLeaf = tree;
    } else if (operations.includes(tokens[i])) {
      const leaf = (workingLeaf as OperatorExpression);
      if (operations.indexOf(leaf.operation) > operations.indexOf(tokens[i])) {
        const lastChild = leaf.children.pop();
        leaf.children.push(new OperatorExpression(tokens[i], [lastChild!]));
        workingLeaf = leaf.children[leaf.children.length - 1];
      } else {
        tree = new OperatorExpression(tokens[i], [tree]);
      }
    } else if (
      tree instanceof OperatorExpression && tree.children.length === 1
    ) {
      tree.children.push(new NumericExpression(parseFloat(tokens[i])));
    } else {
      const leaf = (workingLeaf as OperatorExpression);

      leaf.children.push(new NumericExpression(parseFloat(tokens[i])));
    }
  }

  return tree.evaluate();
};

export default evaluateExpression;
