import { Action } from '../shared';

export const types = {
  LOGIN: 'login',
};

const login = userData => (dispatch) => {
  dispatch(Action(types.LOGIN, { username: userData.username }));
  return { username: userData.username };
};

export const actions = {
  login,
};
