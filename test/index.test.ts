import evaluateFormulae from '../src/index';

describe('evaluateFormulae', () => {
  it('evaluates each expression', () => {
    expect(evaluateFormulae({ foo: '0', bar: '1+1' })).toEqual({ foo: 0, bar: 2 });
  });

  it('provides results of evaluating one expression as a variable to later ones', () => {
    expect(evaluateFormulae({ foo: '0', bar: 'foo+1' })).toEqual({ foo: 0, bar: 1 });
  });

  it('throws an error if a nonexistent formula is referenced as a variable', () => {
    expect(() => evaluateFormulae({ foo: 'nonesuch' })).toThrow("No definition for 'nonesuch'");
  });
});
