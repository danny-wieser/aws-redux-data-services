import { Config, CognitoIdentityCredentials } from 'aws-sdk';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';

export function doConfigure({ region,  }) {
  Config.region = region;
  console.log('configured!!')
}

function getUserPool({ IdentityPoolId, UserPoolId, ClientId }) {
  Config.credentials = new CognitoIdentityCredentials({ IdentityPoolId });
  return new CognitoUserPool({ UserPoolId, ClientId });
}

export function doLogin(Username, Password, config) {
  const Pool = getUserPool(config);
  const authenticationData = { Username, Password };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const userData = { Username, Pool };
  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails).then(() => {
    console.log('success');
  });
}

export function resetPassword() {

}


// {
//   onSuccess: result => {
//     const accessToken = result.getAccessToken().getJwtToken();
//     const credentials = new CognitoIdentityCredentials({
//       IdentityPoolId : 'us-east-1:5b7119a4-6871-4c87-9387-8b06030c2b01',
//       Logins : {
//         'cognito-idp.us-east-1.amazonaws.com/us-east-1_je079j53O' : result.getIdToken().getJwtToken()
//       }
//     });
//     //credentials.refresh();
//     console.log('on success', accessToken);
//     //writeToDB(credentials);
//   },
//   onFailure: (result, err) => {
//     console.log('failure', err);
//     console.log(result)
//   },
//   newPasswordRequired: (userAttributes) => {
//     //TODO: here we would trigger an action to go to a reset page
//     delete userAttributes.email_verified;
//     userAttributes.given_name = 'Danny Wieser';
//     console.log('new password!!!', userAttributes);
//     console.log('on success');
//     cognitoUser.completeNewPasswordChallenge('Lopper1978!', userAttributes, {
//       onFailure: result => console.error(result)
//     });
//   }
