
import tape from 'tape';
import _test from 'tape-promise';
import sinon from 'sinon';
import User from '../models/userModel';
import userSevice from './userService';

const test = _test(tape);

test('userService, calling saveUser, calls save method and returns the promise.', (t) => {
  const user = { userName: '', password: '' };

  const saveStub = sinon.stub(User.prototype, 'save').resolves({ id: 1234 });

  return userSevice().saveUser(user).then((data) => {
    t.deepEqual(data, { id: 1234 }, 'it should resolve the promise correctly.');
    t.ok(saveStub.calledOnce, 'mongoose save should be called once');
    t.end();
  });
});
