import Expression from './expressions/Expression';
import expressionTreeFromString from './expressionTreeFromString';
import { FunctionDefinitions } from './types';

type DependencyTableEntry = { key: string, tree: Expression };

const evaluateFormulae = (
  formulae: Record<string, string>,
  functions: FunctionDefinitions = {},
): Record<string, number> => {
  const result = {} as Record<string, number>;
  const dependencyTable = {} as Record<string, [DependencyTableEntry]>;
  const queue = [] as { key: string, tree: Expression }[];

  const markDependencyResolved = (varName: string) => {
    dependencyTable[varName]?.forEach(({ key, tree }) => {
      if ([...tree.getVariables()].every((v) => Object.keys(result).includes(v))) {
        queue.push({ key, tree });
      }
    });

    delete dependencyTable[varName];
  };

  Object.keys(formulae).forEach((key) => {
    const tree = expressionTreeFromString(formulae[key]);

    if (tree.getVariables().size === 0) {
      queue.push({ key, tree });
    }

    tree.getVariables().forEach((variableName) => {
      dependencyTable[variableName] = dependencyTable[variableName] || [];
      dependencyTable[variableName].push({ key, tree });
    });
  });

  while (queue.length > 0) {
    const [{ key, tree }] = queue.splice(0, 1);
    result[key] = tree.evaluate(result, functions);
    markDependencyResolved(key);
  }

  if (Object.keys(dependencyTable).length > 0) {
    const formattedVariableList = Object.keys(dependencyTable).map((k) => `'${k}'`);
    throw new Error(`No definition for variable(s) ${formattedVariableList.join(', ')}`);
  }

  return result;
};

export default evaluateFormulae;
