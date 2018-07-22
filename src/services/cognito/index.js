import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

Config.region = 'us-east-1';
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:5b7119a4-6871-4c87-9387-8b06030c2b01'
});

const userPool = new CognitoUserPool({
  UserPoolId: 'us-east-1_je079j53O',
  ClientId: '647kgohecrr5c4b7q3j4snarc6',
});

//create authenticationDetails object
const authenticationData = {
  Username : 'danny.wieser@gmail.com',
  Password : 'Lopper1978!',
};
const authenticationDetails = new AuthenticationDetails(authenticationData);


//create cognitoUser object
const userData = {
  Username : 'danny.wieser@gmail.com',
  Pool : userPool
};
const cognitoUser = new CognitoUser(userData);

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: result => {
    const accessToken = result.getAccessToken().getJwtToken();
    const credentials = new CognitoIdentityCredentials({
      IdentityPoolId : 'us-east-1:5b7119a4-6871-4c87-9387-8b06030c2b01',
      Logins : {
        'cognito-idp.us-east-1.amazonaws.com/us-east-1_je079j53O' : result.getIdToken().getJwtToken()
      }
    });
    //credentials.refresh();
    console.log('on success', accessToken);
    writeToDB(credentials);
  },
  onFailure: (result, err) => {
    console.log('failure', err);
    console.log(result)
  },
  newPasswordRequired: (userAttributes) => {
    //TODO: here we would trigger an action to go to a reset page
    delete userAttributes.email_verified;
    userAttributes.given_name = 'Danny Wieser';
    console.log('new password!!!', userAttributes);
    console.log('on success');
    cognitoUser.completeNewPasswordChallenge('Lopper1978!', userAttributes, {
      onFailure: result => console.error(result)
    });
  }
});
