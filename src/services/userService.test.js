import tape from 'tape';
import _test from 'tape-promise';
import sinon from 'sinon';
import User from '../models/userModel';
import userSevice from './userService';

const test = _test(tape);

test('userService.saveUser(), calls save method and returns the promise.', (t) => {
  const user = { userName: '', password: '' };

  const saveStub = sinon.stub(User.prototype, 'save').resolves({ _id: 1234,
    userName: 'matt',
    name: 'marvin',
    isAdmin: true,
    roles: ['abc', 'cdv'] });

  return userSevice().saveUser(user).then((data) => {
    t.deepEqual(data, { id: 1234,
      userName: 'matt',
      name: 'marvin',
      isAdmin: true,
      roles: ['abc', 'cdv'] }, 'it should resolve the promise correctly.');
    t.ok(saveStub.calledOnce, 'mongoose save should be called once');

    saveStub.restore();
    t.end();
  });
});

test('userService.findUsers(), passing params without sort, calls find, exec and returns the users', (t) => {
  const params = { userName: '' };

  const execStub = sinon.stub().resolves([{ _id: 1234, userName: 'test', name: 'marvin', isAdmin: true, roles: ['abc'] }]);
  const sortSpy = sinon.spy();
  const findStub = sinon.stub(User, 'find').callsFake(() => ({
    exec: execStub,
    sort: sortSpy,
  }));

  return userSevice().findUsers(params).then((data) => {
    t.deepEqual(data, [{ id: 1234,
      userName: 'test',
      name: 'marvin',
      isAdmin: true,
      roles: ['abc'] }], 'it should resolve the promise and return the users.');
    t.ok(findStub.calledOnceWith(params), 'mongoose find should be called once with params');
    t.ok(execStub.calledOnce, 'exec should be called once');
    t.ok(!sortSpy.called, 'sort should not be called');

    findStub.restore();

    t.end();
  });
});

test('userService.findUsers(), passing params and sort, calls find,sort, exec and returns the users', (t) => {
  const params = { userName: '' };
  const sort = { userName: 'desc' };

  const execStub = sinon.stub().resolves([{ _id: 1234, userName: 'test', name: 'marvin', isAdmin: true, roles: ['abc'] }]);
  const sortStub = sinon.stub().callsFake(() => ({ exec: execStub }));
  const findStub = sinon.stub(User, 'find').callsFake(() => ({
    exec: execStub,
    sort: sortStub,
  }));

  return userSevice().findUsers(params, sort).then((data) => {
    t.deepEqual(data, [{ id: 1234,
      userName: 'test',
      name: 'marvin',
      isAdmin: true,
      roles: ['abc'] }], 'it should resolve the promise and return the users.');
    t.ok(findStub.calledOnceWith(params), 'mongoose find should be called once with params');
    t.ok(execStub.calledOnce, 'exec should be called once');
    t.ok(sortStub.calledOnceWith(sort), 'sort should be called once with params');

    findStub.restore();
    t.end();
  });
});

test('userService.findUser(), passing params, calls findOne, exec and returns the user', (t) => {
  const params = { userName: 'my name' };

  const execStub = sinon.stub().resolves([{ userName: 'my name' }]);
  const findStub = sinon.stub(User, 'findOne').callsFake(() => ({
    exec: execStub,
  }));

  return userSevice().findUser(params).then((data) => {
    t.deepEqual(data, [{ userName: 'my name' }], 'it should resolve the promise and return the user.');
    t.ok(findStub.calledOnceWith(params), 'mongoose find should be called once with params');
    t.ok(execStub.calledOnce, 'exec should be called once');

    findStub.restore();
    t.end();
  });
});
