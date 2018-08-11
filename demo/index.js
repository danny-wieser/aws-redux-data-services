/* eslint-env browser */
/* eslint-disable import/no-extraneous-dependencies */
import { renderDemo, configure as demoConfigure } from 'redux-service-demo';
import 'redux-service-demo/styles/index.css';
import cognito from '../src/state/cognito';
import { configure } from '../src';
import config from './config.yml';

configure(config);
demoConfigure({
  title: 'AWS Redux Data Services',
});

const services = {
  cognito: {
    reducer: cognito.reducer,
    types: cognito.types,
    actions: cognito.actions,
    forms: {
      LOGIN: ['username'],
    },
  },
};

renderDemo(services, document.getElementById('container'));
