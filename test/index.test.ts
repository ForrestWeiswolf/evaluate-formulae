import evaluateFormulae from '../src/index';

describe('evaluateFormulae', () => {
  it('evaluates each expression', () => {
    expect(evaluateFormulae({ foo: '0', bar: '1+1' })).toEqual({ foo: 0, bar: 2 });
  });

  it('evaluates expressions with decimals', () => {
    expect(evaluateFormulae({ foo: '1.1+2.2' })).toEqual({ foo: 1.1 + 2.2 });
    // TODO: consider how to handle float precision
    // (see similar comment in expressionTreeFromString.test.ts)
  });

  it('evaluates expressions with multiple operations', () => {
    expect(evaluateFormulae({ foo: '2*2+4-3' })).toEqual({ foo: 5 });
  });

  it('evaluates expressions with negative numbers', () => {
    expect(evaluateFormulae({ foo: '-1*-1' })).toEqual({ foo: 1 });
  });

  it('evaluates expressions with parentheses', () => {
    expect(evaluateFormulae({ foo: '(5+5+1)*2' })).toEqual({ foo: 22 });
  });

  it('evaluates expressions with custom fuctions', () => {
    expect(evaluateFormulae({ foo: 'double(5)' }, { double: (x) => x * 2 })).toEqual({ foo: 10 });
  });

  it('provides results of evaluating one expression as a variable to later ones', () => {
    expect(evaluateFormulae({ foo: '0', bar: 'foo+1' })).toEqual({ foo: 0, bar: 1 });
  });

  xit('throws an error if a nonexistent formula is referenced as a variable', () => {
    expect(() => evaluateFormulae({ foo: 'nonesuch' })).toThrow("No definition for 'nonesuch'");
  });

  it('provides referenced expressions as variables regardless of expression order', () => {
    expect(evaluateFormulae({ a: 'b+1', b: '1', c: 'b+a' })).toEqual({ a: 2, b: 1, c: 3 });
  });

  it('provides referenced expressions as variables when they have their own referenced expressions', () => {
    expect(evaluateFormulae({ a: 'b+1', b: 'c*2', c: '1+1' })).toEqual({ a: 5, b: 4, c: 2 });
  });
});
