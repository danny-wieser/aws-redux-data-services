import * as $ from 'jquery';
import * as cognito from './services/cognito';
import { configure } from '../src';
import config from './config.yml';
import { initializeStore, createActionSelect } from './demo-utils';

configure(config);

const state = { cognito: cognito.reducer };
const store = initializeStore(state);

// setup action select UI for services
const container = $('#actions');
const services = { cognito };
createActionSelect(services, container);

store.subscribe(() => $('#current-state').html(JSON.stringify(store.getState(), undefined, 2)));
