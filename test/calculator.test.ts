import evaluateExpression from '../src/calculator';

it('handles numbers with no operations', () => {
  expect(evaluateExpression('12')).toBe(12);
});

describe('simple arithmetic', () => {
  it('handles simple multiplication', () => {
    expect(evaluateExpression('2*3')).toBe(6);
  });

  it('handles simple addition', () => {
    expect(evaluateExpression('1+2')).toBe(3);
  });

  it('handles simple subtraction', () => {
    expect(evaluateExpression('1-2')).toBe(-1);
  });

  it('handles simple division', () => {
    expect(evaluateExpression('4/2')).toBe(2);
  });

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
    // expect(evaluateExpression('2*2+1')).toBe(5);
  });
});

// TODO: check that it works right when floats are involved
// TODO: implement exponentiation

describe('providing variables', () => {
  it('evalutes a variable to its provided value', () => {
    expect(evaluateExpression('numberOfCounting', { numberOfCounting: 3 })).toBe(3);
  });
});
