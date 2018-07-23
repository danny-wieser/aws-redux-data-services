
export const types = {
  LOGIN: 'login',
};

const login = userData => (dispatch) => {
  dispatch({ type: types.login });
  return { username: userData.username };
};

export const actions = {
  login,
};
