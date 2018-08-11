import { types } from './actions';
import { createReducer } from '../shared';

export const INITIAL_STATE = {};

const login = (state, data) => ({ ...state, username: data.payload.username });
const configure = (state, data) => ({ ...state, config: { ...data.payload.config } });

export const reducer = createReducer(INITIAL_STATE, {
  [types.login]: (state, action) => login(state, action),
  [types.configure]: (state, action) => configure(state, action),
});
