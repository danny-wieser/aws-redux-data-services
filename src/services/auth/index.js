import Amplify from 'aws-amplify';

export const doConfigure = authConfig => Amplify.configure({ Auth: { ...authConfig } });
export const doLogin = async (username, password) => Amplify.Auth.signIn(username, password);
export const doSignupConfirm = async (username, code) => Amplify.Auth.confirmSignUp(username, code);
export const doCacheLoad = async () => Amplify.Auth.currentSession();

export async function doSignup(username, password, givenName) {
  const attributes = { email: username, given_name: givenName };
  return Amplify.Auth.signUp({ username, password, attributes });
}
