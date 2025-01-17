import evaluateFormulae from '../src/index'

it('returns numbers unchanged', () => {
  expect(evaluateFormulae({"foo": "0", "bar": "1"})).toEqual({"foo": 0, "bar": 1})
})