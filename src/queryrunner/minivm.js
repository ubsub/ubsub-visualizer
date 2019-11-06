
// Not really a vm, but will semi-isolate code executed
// NOT a security mechanism, just an isolation one


export default function runCode(__code, __context) {
  let src = '';

  // alias keys to their contextual value
  Object.keys(__context).forEach((key) => {
    src += `const ${key} = __context['${key}'];`;
  });

  // And append code
  src += __code;

  // eslint-disable-next-line no-eval
  return eval(src);
}
