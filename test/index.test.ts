import evaluateFormulae from '../src/index';

describe('evaluateFormulae', () => {
  it('evaluates each expression', () => {
    expect(evaluateFormulae({ foo: '0', bar: '1+1' })).toEqual({ foo: 0, bar: 2 });
  });

  it('evaluates expressions with decimals', () => {
    expect(evaluateFormulae({ foo: '1.1+2.2' })).toEqual({ foo: 1.1 + 2.2 });
    // TODO: consider how to handle float precision
    // (see similar comment in calculator.test.ts)
  });

  it('evaluates expressions with multiple operations', () => {
    expect(evaluateFormulae({ foo: '2*2+4-3' })).toEqual({ foo: 5 });
  });

  it('provides results of evaluating one expression as a variable to later ones', () => {
    expect(evaluateFormulae({ foo: '0', bar: 'foo+1' })).toEqual({ foo: 0, bar: 1 });
  });

  it('throws an error if a nonexistent formula is referenced as a variable', () => {
    expect(() => evaluateFormulae({ foo: 'nonesuch' })).toThrow("No definition for 'nonesuch'");
  });

  it('provides referenced expressions as variables regardless of expression order', () => {
    expect(evaluateFormulae({ a: 'b+1', b: '1', c: 'b+a' })).toEqual({ a: 2, b: 1, c: 3 });
  });
});
