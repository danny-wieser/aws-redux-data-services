import { types } from './actions';
import { createReducer } from '../shared'

export const INITIAL_STATE = {};

function login() {
  return INITIAL_STATE;
}

export const reducer = createReducer(INITIAL_STATE,
  {
    [types.LOGIN]: login
  }
);
