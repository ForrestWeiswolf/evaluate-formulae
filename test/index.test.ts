import evaluateFormulae from '../src/index';
import evaluateExpression from '../src/calculator/calculator';

jest.mock('../src/calculator/calculator.ts');

describe('evaluateFormulae', () => {
  it('calls evaluateExpression on each expression', () => {
    const evaluateExpressionMock = evaluateExpression as jest.Mock;

    evaluateExpressionMock.mockImplementation((expression) => (expression === '0' ? 0 : 1));
    expect(evaluateFormulae({ foo: '0', bar: '1+1' })).toEqual({ foo: 0, bar: 1 });
    expect(evaluateExpressionMock).toHaveBeenCalledWith('0');
    expect(evaluateExpressionMock).toHaveBeenCalledWith('1+1');
  });
});
