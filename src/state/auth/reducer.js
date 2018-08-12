import { types } from './actions';
import {
  createReducer,
  ok,
  fail,
  loading,
  error,
} from '../shared';

export const INITIAL_STATE = {};

const loginOk = (state, data) => {
  const { signInUserSession } = data.payload;
  const { payload, jwtToken } = signInUserSession.idToken;
  return {
    ...state,
    jwtToken,
    userData: payload,
    authSuccess: true,
    isLoading: false,
  };
};

const signupOK = (state, data) => {
  const { userConfirmed } = data.payload;
  const { username } = data.payload.user;
  return {
    ...state,
    userConfirmed,
    username,
    isLoading: false,
  };
};

const signupconfirmOK = (state, data) => {
  const { result } = data.payload;
  const userConfirmed = result === 'SUCCESS';
  return {
    ...state,
    userConfirmed,
    isLoading: false,
  };
};

const loadauthOK = (state, data) => {
  const { payload, jwtToken } = data.payload.idToken;
  return {
    ...state,
    jwtToken,
    userData: payload,
    authSuccess: true,
    isLoading: false,
  };
};
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
  [ok(types.login)]: (state, action) => loginOk(state, action),
  [fail(types.login)]: (state, action) => error(state, action),

  [types.signup]: (state, action) => loading(state, action),
  [ok(types.signup)]: (state, action) => signupOK(state, action),
  [fail(types.signup)]: (state, action) => error(state, action),

  [types.signupconfirm]: (state, action) => loading(state, action),
  [ok(types.signupconfirm)]: (state, action) => signupconfirmOK(state, action),
  [fail(types.signupconfirm)]: (state, action) => error(state, action),

  [types.loadauth]: (state, action) => loading(state, action),
  [ok(types.loadauth)]: (state, action) => loadauthOK(state, action),
  [fail(types.loadauth)]: (state, action) => loadAuthFail(state, action),

  [types.signout]: (state, action) => loading(state, action),
  [ok(types.signout)]: (state, action) => signoutOK(state, action),
  [fail(types.signout)]: (state, action) => error(state, action),

  [types.configure]: (state, action) => configure(state, action),
});
