import Expression from './Expression';
import expressionTreeFromString from './expressionTreeFromString';

const evaluateFormulae = (formulae: Record<string, string>): Record<string, number> => {
  const result = {} as Record<string, number>;
  const queue = [] as { key: string, tree: Expression }[];

  Object.keys(formulae).forEach((key) => {
    const tree = expressionTreeFromString(formulae[key]);

    if (tree.getVariables().size === 0) {
      result[key] = tree.evaluate(result);
    } else {
      queue.push({ key, tree });
    }
  });

  queue.forEach(({ key, tree }) => {
    result[key] = tree.evaluate(result);
  });

  return result;
};

export default evaluateFormulae;
