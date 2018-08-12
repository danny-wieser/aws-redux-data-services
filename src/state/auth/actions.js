import {
  Action,
  Payload,
  ok,
  fail,
} from '../shared';
import * as auth from '../../services/auth';

export const types = {
  configure: 'configure',
  login: 'login',
  signup: 'signup',
  signupconfirm: 'signupconfirm',
  loadauth: 'loadauth',
};

const configure = (config) => {
  auth.doConfigure(config);
  return Action(types.configure, Payload({ config }));
};

const login = (username, password) => async (dispatch) => {
  dispatch(Action(types.login, Payload({ username })));
  try {
    const response = await auth.doLogin(username, password);
    dispatch(Action(ok(types.login), Payload(response)));
  } catch (error) {
    dispatch(Action(fail(types.login), Payload(error)));
  }
};

const signup = (email, password, givenname) => async (dispatch) => {
  dispatch(Action(types.signup, Payload({ email, password, givenname })));
  try {
    const response = await auth.doSignup(email, password, givenname);
    dispatch(Action(ok(types.signup), Payload(response)));
  } catch (error) {
    dispatch(Action(fail(types.signup), Payload(error)));
  }
};

const signupconfirm = (username, code) => async (dispatch) => {
  dispatch(Action(types.signupconfirm, Payload({ username })));
  try {
    const response = await auth.doSignupConfirm(username, code);
    dispatch(Action(ok(types.signupconfirm), Payload({ result: response })));
  } catch (error) {
    dispatch(Action(fail(types.signupconfirm), Payload(error)));
  }
};

const loadauth = () => async (dispatch) => {
  dispatch(Action(types.loadauth, Payload({})));
  try {
    const response = await auth.doCacheLoad();
    dispatch(Action(ok(types.loadauth), Payload(response)));
  } catch (error) {
    dispatch(Action(fail(types.loadauth), Payload(error)));
  }
};

export const actions = {
  login,
  configure,
  signup,
  signupconfirm,
  loadauth,
};
