/* eslint-env browser */
/* eslint-disable import/no-extraneous-dependencies */
import { renderDemo, configure as demoConfigure, demoStore } from 'redux-service-demo';
import 'redux-service-demo/styles/index.css';
import cognito from '../src/state/cognito';
import { configure } from '../src';
import config from './config.yml';

configure(config);
demoConfigure({
  title: 'AWS Redux Data Services',
  useLogger: true,
});

const services = {
  cognito: {
    reducer: cognito.reducer,
    types: cognito.types,
    actions: cognito.actions,
    forms: {
      login: ['username', 'password'],
      configure: ['config'],
    },
  },
};

renderDemo(services, document.getElementById('container'));

demoStore.dispatch(cognito.actions.configure({
  region: 'us-east-1',
  IdentityPoolId: 'us-east-1:5b7119a4-6871-4c87-9387-8b06030c2b01',
  UserPoolId: 'us-east-1_je079j53O',
  ClientId: '647kgohecrr5c4b7q3j4snarc6',
}));
