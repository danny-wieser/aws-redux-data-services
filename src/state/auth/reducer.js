import { types } from './actions';
import {
  createReducer,
  ok,
  fail,
  loading,
  reducerOK,
  error,
} from '../shared';

export const INITIAL_STATE = {};

function loginOK(state, data) {
  return {
    ...state,
    ...data.payload,
    authSuccess: true,
    isLoading: false,
  };
}

function loadAuthFail(state) {
  return {
    ...state,
    authSuccess: false,
    isLoading: false,
    userData: null,
  };
}

function signoutOK(state) {
  return {
    ...state,
    userData: null,
    authSuccess: false,
    isLoading: false,
    jwtToken: null,
  };
}

const configure = (state, data) => ({ ...state, config: { ...data.payload.config } });

export const reducer = createReducer(INITIAL_STATE, {
  [types.login]: (state, action) => loading(state, action),
  [ok(types.login)]: (state, action) => loginOK(state, action),
  [fail(types.login)]: (state, action) => error(state, action),

  [types.signup]: (state, action) => loading(state, action),
  [ok(types.signup)]: (state, action) => reducerOK(state, action),
  [fail(types.signup)]: (state, action) => error(state, action),

  [types.signupconfirm]: (state, action) => loading(state, action),
  [ok(types.signupconfirm)]: (state, action) => reducerOK(state, action),
  [fail(types.signupconfirm)]: (state, action) => error(state, action),

  [types.loadauth]: (state, action) => loading(state, action),
  [ok(types.loadauth)]: (state, action) => loginOK(state, action),
  [fail(types.loadauth)]: (state, action) => loadAuthFail(state, action),

  [types.signout]: (state, action) => loading(state, action),
  [ok(types.signout)]: (state, action) => signoutOK(state, action),
  [fail(types.signout)]: (state, action) => error(state, action),

  [types.configure]: (state, action) => configure(state, action),
});
