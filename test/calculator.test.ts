import evaluateExpression from '../src/calculator';

it('handles numbers with no operations', () => {
  expect(evaluateExpression('12')).toBe(12);
});

describe('simple arithmetic', () => {
  it('handles multiplication', () => {
    expect(evaluateExpression('2*3*3')).toBe(18);
  });

  it('handles addition', () => {
    expect(evaluateExpression('1+1+1')).toBe(3);
  });

  it('handles subtraction', () => {
    expect(evaluateExpression('1-2-1')).toBe(-2);
  });

  it('handles division', () => {
    expect(evaluateExpression('4/2/2')).toBe(1);
  });

  it('handles multiplication and addition in the correct order', () => {
    expect(evaluateExpression('1+2*2')).toBe(5);
    expect(evaluateExpression('2*2+1')).toBe(5);
  });

  it('handles exponentiation', () => {
    expect(evaluateExpression('3^2')).toBe(9);
  });

  it('handles multiplication and exponentiation in the correct order', () => {
    expect(evaluateExpression('2*3^2')).toBe(18);
    expect(evaluateExpression('2^3*2')).toBe(16);
  });

  it('handles arithmetic involving floats', () => {
    expect(evaluateExpression('1.5*4')).toBe(6);
    // TODO: consider how to handle float precision (e.g. 1.5*4.4 returns 6.6000000000000005)
  });
});

// TODO: validation

describe('providing variables', () => {
  it('evalutes a variable to its provided value', () => {
    expect(evaluateExpression('numberOfCounting', { numberOfCounting: 3 })).toBe(3);
  });

  it('evaluates an expression with a variable', () => {
    expect(evaluateExpression('foo+1', { foo: 1 })).toBe(2);
  });

  it('evaluates an expression with two variables', () => {
    expect(evaluateExpression('foo+bar', { foo: 1, bar: 2 })).toBe(3);
  });

  it('evaluates an expression with one variable used twice', () => {
    expect(evaluateExpression('foo*foo', { foo: 2 })).toBe(4);
  });
});
