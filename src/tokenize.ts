import operations from './operations';

const tokenize = (expression: string) => {
  const result = [];
  let token = '';
  for (let i = 0; i < expression.length; i++) {
    if (
      expression[i] === '-' && token === ''
      && (i === 0 || operations.includes(result[result.length - 1]))
    ) {
      token += expression[i];
    } else if (operations.includes(expression[i])) {
      result.push(token, expression[i]);
      token = '';
    } else if (/[\d.]/.exec(expression[i]) || /\w/.exec(expression[i])) {
      token += expression[i];
    }
  }
  result.push(token);

  return result;
};

export default tokenize;
