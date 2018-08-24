import Amplify from 'aws-amplify';

const awsInvoke = async (func, ...params) => {
  let result;
  try {
    const data = await Amplify.Auth[func](...params);
    result = { ok: true, data };
  } catch (error) {
    result = { ok: false, error };
  }
  return result;
};

export const doConfigure = authConfig => Amplify.configure({ Auth: { ...authConfig } });
export const doLogin = async (username, password) => {
  const { ok, error, data } = await awsInvoke('signIn', username, password);
  const { signInUserSession } = data;
  const { idToken } = signInUserSession;
  const { payload, jwtToken } = idToken;
  return { ok, error, payload: { jwtToken, userData: payload } };
};

export async function doSignup(email, password, givenName) {
  const attributes = { email, given_name: givenName };
  const { ok, error, data } = await awsInvoke('signUp', { username: email, password, attributes });
  const { userConfirmed, user } = data;
  const { username } = user;
  return { ok, error, payload: { userConfirmed, username } };
}

export const doSignupConfirm = async (username, code) => {
  const { ok, error, data } = await awsInvoke('confirmSignUp', username, code);
  const userConfirmed = data === 'SUCCESS';
  return { ok, error, payload: { userConfirmed } };
};

export const doCacheLoad = async () => {
  const { ok, error, data } = await awsInvoke('currentSession');
  const { idToken } = data;
  const { payload, jwtToken } = idToken;
  return { ok, error, payload: { jwtToken, userData: payload } };
};

export const doSignout = () => awsInvoke('signOut');
