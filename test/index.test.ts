import evaluateFormulae from '../src/index';

it('returns numbers unchanged', () => {
  expect(evaluateFormulae({ foo: '0', bar: '1' })).toEqual({ foo: 0, bar: 1 });
});

it('handles multiplication', () => {
  expect(evaluateFormulae({ foo: '2*3*3', bar: '1' })).toEqual({ foo: 18, bar: 1 });
});

it('handles addition', () => {
  expect(evaluateFormulae({ foo: '1+1+1', bar: '1' })).toEqual({ foo: 3, bar: 1 });
});

it('handles subtraction', () => {
  expect(evaluateFormulae({ foo: '1-2-1', bar: '1' })).toEqual({ foo: -2, bar: 1 });
});

it('handles division', () => {
  expect(evaluateFormulae({ foo: '4/2/2', bar: '1' })).toEqual({ foo: 1, bar: 1 });
});

it('handles multiplication and addition in the correct order', () => {
  expect(evaluateFormulae({ foo: '1+2*2', bar: '1' })).toEqual({ foo: 5, bar: 1 });
  expect(evaluateFormulae({ foo: '2*2+1', bar: '1' })).toEqual({ foo: 5, bar: 1 });
});
