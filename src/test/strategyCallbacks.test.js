import proxyquire from 'proxyquire';
import test from 'tape';

test('my failing test sample', (t) => {
  t.equal(0,1);
  t.end();
});
