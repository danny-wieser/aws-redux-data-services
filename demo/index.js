/* eslint-env browser */
/* eslint-disable import/no-extraneous-dependencies */
import { renderDemo, configure as demoConfigure, demoStore } from 'redux-service-demo';
import 'redux-service-demo/styles/index.css';
import cognito from '../src/state/cognito';
import config from './config.yaml';

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

//auto-dispatch action for AWS config
demoStore.dispatch(cognito.actions.configure(config));
