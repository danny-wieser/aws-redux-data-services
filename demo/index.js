/* eslint-env browser */
/* eslint-disable import/no-extraneous-dependencies */
import { renderDemo, configure as demoConfigure } from 'redux-service-demo';
import 'redux-service-demo/styles/index.css';
import { auth } from '../src';
import config from './config.yaml';

demoConfigure({
  title: 'AWS Redux Data Services',
  useLogger: true,
});

const services = {
  auth: {
    reducer: auth.reducer,
    types: auth.types,
    actions: auth.actions,
    forms: {
      login: ['username', 'password'],
      configure: ['config'],
      signup: ['email', 'password', 'givenname'],
      signupconfirm: ['email', 'code'],
      loadauth: [],
    },
  },
};

const demoStore = renderDemo(services, document.getElementById('container'));
// auto-dispatch action for AWS config
demoStore.dispatch(auth.actions.configure(config));
