import expressionTreeFromString from './expressionTreeFromString';

const evaluateExpression = (expression: string, variables: Record<string, number> = {}): number => {
  const tree = expressionTreeFromString(expression);

  return tree.evaluate(variables);
};

const evaluateFormulae = (formulae: Record<string, string>): Record<string, number> => {
  const result = {} as Record<string, number>;

  Object.keys(formulae).forEach((key) => {
    result[key] = evaluateExpression(formulae[key], result);
  });

  return result;
};

export default evaluateFormulae;
