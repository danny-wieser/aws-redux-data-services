import {
  ActionLoading,
  ActionOK,
  ActionFail,
} from '../shared';
import * as auth from '../../services/auth';

export const types = {
  configure: 'configure',
  login: 'login',
  signup: 'signup',
  signupconfirm: 'signupconfirm',
  signout: 'signout',
  loadauth: 'loadauth',
};

const configure = (config) => {
  auth.doConfigure(config);
  return ActionLoading(types.configure, { config });
};

const login = (username, password) => async (dispatch) => {
  const type = types.login;
  dispatch(ActionLoading(type, { username }));
  const { ok, payload, error } = await auth.doLogin(username, password);
  const action = ok ? ActionOK(type, payload) : ActionFail(type, error);
  dispatch(action);
};

const signup = (email, password, givenname) => async (dispatch) => {
  const type = types.signup;
  dispatch(ActionLoading(type, { email, password, givenname }));
  const { ok, payload, error } = await auth.doSignup(email, password, givenname);
  const action = ok ? ActionOK(type, payload) : ActionFail(type, error);
  dispatch(action);
};

const signupconfirm = (username, code) => async (dispatch) => {
  const type = types.signupconfirm;
  dispatch(ActionLoading(type, { username }));
  const { ok, payload, error } = await auth.doSignupConfirm(username, code);
  const action = ok ? ActionOK(type, payload) : ActionFail(type, error);
  dispatch(action);
};

const loadauth = () => async (dispatch) => {
  const type = types.loadauth;
  dispatch(ActionLoading(type, {}));
  const { ok, payload, error } = await auth.doCacheLoad();
  const action = ok ? ActionOK(type, payload) : ActionFail(type, error);
  dispatch(action);
};

const signout = () => async (dispatch) => {
  const type = types.signout;
  dispatch(ActionLoading(type, {}));
  const { ok, payload, error } = await auth.doSignout();
  const action = ok ? ActionOK(type, payload) : ActionFail(type, error);
  dispatch(action);
};

export const actions = {
  login,
  configure,
  signup,
  signupconfirm,
  signout,
  loadauth,
};
