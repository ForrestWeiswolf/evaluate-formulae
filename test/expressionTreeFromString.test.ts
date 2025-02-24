import expressionTreeFromString from '../src/expressionTreeFromString';

it('handles numbers with no operations', () => {
  expect(expressionTreeFromString('12').evaluate({})).toBe(12);
});

describe('simple arithmetic', () => {
  it('handles multiplication', () => {
    expect(expressionTreeFromString('2*3*3').evaluate({})).toBe(18);
  });

  it('handles addition', () => {
    expect(expressionTreeFromString('1+1+1').evaluate({})).toBe(3);
  });

  it('handles subtraction', () => {
    expect(expressionTreeFromString('1-2-1').evaluate({})).toBe(-2);
  });

  it('handles division', () => {
    expect(expressionTreeFromString('4/2/2').evaluate({})).toBe(1);
  });

  it('handles multiplication and addition in the correct order', () => {
    expect(expressionTreeFromString('1+2*2').evaluate({})).toBe(5);
    expect(expressionTreeFromString('2*2+1').evaluate({})).toBe(5);
  });

  it('handles exponentiation', () => {
    expect(expressionTreeFromString('3^2').evaluate({})).toBe(9);
  });

  it('handles multiplication and exponentiation in the correct order', () => {
    expect(expressionTreeFromString('2*3^2').evaluate({})).toBe(18);
    expect(expressionTreeFromString('2^3*2').evaluate({})).toBe(16);
  });

  it('handles arithmetic involving floats', () => {
    expect(expressionTreeFromString('1.5*4').evaluate({})).toBe(6);
    // TODO: consider how to handle float precision (e.g. 1.5*4.4 returns 6.6000000000000005)
  });

  it('handles arithmetic involving negative numbers', () => {
    expect(expressionTreeFromString('-1*-2').evaluate({})).toBe(2);
  });
});

// TODO: validation

describe('providing variables', () => {
  it('evalutes a variable to its provided value', () => {
    expect(expressionTreeFromString('numberOfCounting').evaluate({ numberOfCounting: 3 })).toBe(3);
  });

  it('evaluates an expression with a variable', () => {
    expect(expressionTreeFromString('foo+1').evaluate({ foo: 1 })).toBe(2);
  });

  it('evaluates an expression with two variables', () => {
    expect(expressionTreeFromString('foo+bar').evaluate({ foo: 1, bar: 2 })).toBe(3);
  });

  it('evaluates an expression with one variable used twice', () => {
    expect(expressionTreeFromString('foo*foo').evaluate({ foo: 2 })).toBe(4);
  });
});

describe('parentheses', () => {
  it('evaulates parentheticals first', () => {
    expect(expressionTreeFromString('2*(1+1)').evaluate({})).toBe(4);
    expect(expressionTreeFromString('(1+1)*2').evaluate({})).toBe(4);
  });

  it('handles nested parentheticals ', () => {
    expect(expressionTreeFromString('((1+1)*2)-1').evaluate({})).toBe(3);
    expect(expressionTreeFromString('2*(1+(2+2))').evaluate({})).toBe(10);
  });
});

describe('functions', () => {
  it('handles custom unary functions passed in', () => {
    expect(expressionTreeFromString('1+double(1+2)').evaluate({}, { double: (x) => x * 2 })).toBe(7);
  });
});
