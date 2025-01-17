const evaluateFormulae = (formulae: Record<string, string>): Record<string, number> => {
  const result = {} as Record<string, number>;

  Object.keys(formulae).forEach((key) => {
    result[key] = parseInt(formulae[key], 10);
  });

  return result;
};

export default evaluateFormulae;
