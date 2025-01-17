const evaluateFormulae = (formulae: Record<string, string>): Record<string, number> => {
  const result = {} as Record<string, number>

  for (const key of Object.keys(formulae)) {
    result[key] = parseInt(formulae[key])
  }

  return result
}

export default evaluateFormulae