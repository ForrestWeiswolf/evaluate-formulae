import tokenize from '../src/tokenize';

it('returns a single number in a length-1 array', () => {
  expect(tokenize('1')).toEqual(['1']);
});

it('separates numbers and operations ', () => {
  expect(tokenize('1-2*3')).toEqual(['1', '-', '2', '*', '3']);
});

it('treats a number with multiple digits and a decimal as a single token', () => {
  expect(tokenize('3.33+2')).toEqual(['3.33', '+', '2']);
});

it('treats a number with a negative sign as a single token', () => {
  expect(tokenize('-1')).toEqual(['-1']);
  expect(tokenize('2*-1')).toEqual(['2', '*', '-1']);
});

it('does not consider a minus operator part of a number', () => {
  expect(tokenize('12^2-1')).toEqual(['12', '^', '2', '-', '1']);
});

it('treats a variable consisting of letters as a single token', () => {
  expect(tokenize('2+foo')).toEqual(['2', '+', 'foo']);
});

it('treats each paren as a token', () => {
  expect(tokenize('(1)+1')).toEqual(['(', '1', ')', '+', '1']);
});
