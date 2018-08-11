import Amplify from 'aws-amplify';

export function doConfigure(authConfig) {
  Amplify.configure({ Auth: { ...authConfig } });
}

// https://aws-amplify.github.io/amplify-js/media/authentication_guide.html

export async function doLogin(Username, Password) {
  const result = await Amplify.Auth.signIn(Username, Password);
  // TODO: put details in state
}
