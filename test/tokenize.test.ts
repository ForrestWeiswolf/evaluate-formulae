import tokenize from '../src/tokenize';

it('returns a single number in a length-1 array', () => {
  expect(tokenize('11')).toEqual(['11']);
});

it('separates numbers and operations ', () => {
  expect(tokenize('1+2*3')).toEqual(['1', '+', '2', '*', '3']);
});

it('treats a number with multiple digits and a decimal as a single token', () => {
  expect(tokenize('33.33+2')).toEqual(['33.33', '+', '2']);
});

it('treats a variable consisting of letters as a single token', () => {
  expect(tokenize('2+foo')).toEqual(['2', '+', 'foo']);
});
