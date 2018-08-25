import { ok, fail } from '../shared';
import { actions, types } from './actions';
import * as auth from '../../services/auth';

let dispatchSpy;

jest.mock('../../services/auth', () => ({
  doConfigure: jest.fn(),
  doLogin: jest.fn(),
  doSignup: jest.fn(),
}));

test('invokes service doConfigure on a configure action and returns correct action object', () => {
  const config = { foo: 'bar' };
  const result = actions.configure(config);
  expect(auth.doConfigure.mock.calls[0][0]).toEqual(config);
  expect(result).toEqual({ type: types.configure, payload: { config } });
});

describe('login action: success', () => {
  const data = { foo: 'bar' };
  beforeEach(() => {
    dispatchSpy = jest.fn();
    auth.doLogin.mockReturnValue(Promise.resolve({ ok: true, payload: data }));
    actions.login('user', 'pass')(dispatchSpy);
  });

  test('correctly invokes the auth service doLogin action', () => {
    expect(auth.doLogin.mock.calls[0][0]).toEqual('user');
    expect(auth.doLogin.mock.calls[0][1]).toEqual('pass');
  });

  test('dispatches a loading action', () => {
    expect(dispatchSpy.mock.calls[0][0]).toEqual({ type: types.login, payload: { username: 'user' } });
  });

  test('dispatches an OK action', () => {
    expect(dispatchSpy.mock.calls[1][0]).toEqual({
      type: ok(types.login),
      payload: data,
    });
  });
});

describe('login action: failure', () => {
  const data = { foo: 'bar' };
  const error = { message: 'anerror' };
  beforeEach(() => {
    dispatchSpy = jest.fn();
    auth.doLogin.mockReturnValue(Promise.resolve({ ok: false, payload: data, error }));
    actions.login('user', 'pass')(dispatchSpy);
  });

  test('correctly invokes the auth service doLogin action', () => {
    expect(auth.doLogin.mock.calls[0][0]).toEqual('user');
    expect(auth.doLogin.mock.calls[0][1]).toEqual('pass');
  });

  test('dispatches a loading action', () => {
    expect(dispatchSpy.mock.calls[0][0]).toEqual({ type: types.login, payload: { username: 'user' } });
  });

  test('dispatches a FAIL action', () => {
    expect(dispatchSpy.mock.calls[1][0]).toEqual({
      type: fail(types.login),
      payload: error,
    });
  });
});

describe('signup action: success', () => {
  const data = { foo: 'bar' };
  beforeEach(() => {
    dispatchSpy = jest.fn();
    auth.doSignup.mockReturnValue(Promise.resolve({ ok: true, payload: data }));
    actions.signup('email', 'pass', 'username')(dispatchSpy);
  });

  test('correctly invokes the auth service signup action', () => {
    expect(auth.doSignup.mock.calls[0][0]).toEqual('email');
    expect(auth.doSignup.mock.calls[0][1]).toEqual('pass');
    expect(auth.doSignup.mock.calls[0][2]).toEqual('username');
  });

  test('dispatches a loading action', () => {
    expect(dispatchSpy.mock.calls[0][0]).toEqual({
      type: types.signup,
      payload: { email: 'email', password: 'pass', givenname: 'username' },
    });
  });

  test('dispatches an OK action', () => {
    expect(dispatchSpy.mock.calls[1][0]).toEqual({
      type: ok(types.signup),
      payload: data,
    });
  });
});

describe('signup action: failure', () => {
  const data = { foo: 'bar' };
  const error = { message: 'anerror' };
  beforeEach(() => {
    dispatchSpy = jest.fn();
    auth.doSignup.mockReturnValue(Promise.resolve({ ok: false, payload: data, error }));
    actions.signup('email', 'pass', 'username')(dispatchSpy);
  });

  test('correctly invokes the auth service signup action', () => {
    expect(auth.doSignup.mock.calls[0][0]).toEqual('email');
    expect(auth.doSignup.mock.calls[0][1]).toEqual('pass');
    expect(auth.doSignup.mock.calls[0][2]).toEqual('username');
  });

  test('dispatches a loading action', () => {
    expect(dispatchSpy.mock.calls[0][0]).toEqual({
      type: types.signup,
      payload: { email: 'email', password: 'pass', givenname: 'username' },
    });
  });

  test('dispatches a FAIL action', () => {
    expect(dispatchSpy.mock.calls[1][0]).toEqual({
      type: fail(types.signup),
      payload: error,
    });
  });
});
