import proxyquire from 'proxyquire';
import test from 'tape';

const stub = { default: () => { return { met : () => 2 } }};
var foo = proxyquire('./foo.js', { './dep.js': stub });

//console.log(foo);
test('sample test 2', (t) => {
  t.equal(foo.default().met(), 4);
  t.end();
});
