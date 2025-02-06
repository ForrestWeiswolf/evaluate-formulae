const tokenize = (expression: string) => {
  const result = [];

  const matchers = [
    /^\d+(\.\d+)?/, /^[+/\-*^]/, /^\w+/,
  ];

  let i = 0;
  while (i < expression.length) {
    let match;
    for (let j = 0; j < matchers.length && !match; j++) {
      match = matchers[j].exec(expression.slice(i));
      if (match) {
        result.push(match[0]);
        i += match[0].length;
      }
    }
  }

  return result;
};

export default tokenize;
