// TODO: pull this out to another file?
const tokenize = (expression: string) => {
  const result = [];
  let token = '';
  for (let i = 0; i < expression.length; i++) {
    if (/[\d.]/.exec(expression[i])) {
      token += expression[i];
    } else if (/\w/.exec(expression[i])) {
      token += expression[i];
    } else {
      result.push(token, expression[i]);
      token = '';
    }
  }
  result.push(token);

  return result;
};

export default tokenize;
