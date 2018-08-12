import Amplify from 'aws-amplify';

export function doConfigure(authConfig) {
  Amplify.configure({ Auth: { ...authConfig } });
}

// https://aws-amplify.github.io/amplify-js/media/authentication_guide.html

export async function doLogin(username, password) {
  return Amplify.Auth.signIn(username, password);
}

export async function doSignup(username, password, givenName) {
  const attributes = { email: username, given_name: givenName };
  return Amplify.Auth.signUp({ username, password, attributes });
}

export async function doSignupConfirm(username, code) {
  return Amplify.Auth.confirmSignUp(username, code);
}
