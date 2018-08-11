import { Action, Payload } from '../shared';
import { doLogin, doConfigure } from '../../services/cognito';

export const types = {
  configure: 'configure',
  login: 'login',
};

const configure = (config) => {
  doConfigure(config);
  return Action(types.configure, Payload({ config }));
};

const login = (username, password) => (dispatch) => {
  dispatch(Action(types.login, Payload({ username })));
  doLogin(username, password);
};

export const actions = {
  login,
  configure,
};
