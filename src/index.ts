import evaluateExpression from "./calculator/calculator";

const evaluateFormulae = (formulae: Record<string, string>): Record<string, number> => {
  const result = {} as Record<string, number>;

  Object.keys(formulae).forEach((key) => {
    result[key] = evaluateExpression(formulae[key]);
  });

  return result;
};

export default evaluateFormulae;
