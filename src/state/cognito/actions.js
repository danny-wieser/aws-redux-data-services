import { Action } from '../shared';

export const types = {
  LOGIN: 'login'
};

const login = userData => dispatch => {
  dispatch(Action(types.LOGIN));
  console.log('doLogin')
  return {};
}

export const actions = {
  login
};
