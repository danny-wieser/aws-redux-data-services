import { types } from './actions';
import { createReducer } from '../shared';

export const INITIAL_STATE = {};

function login(state, payload) {
  return { ...state, username: payload.username };
}

export const reducer = createReducer(INITIAL_STATE, {
  [types.LOGIN]: (state, action) => login(state, action),
});
