import * as $ from 'jquery';
import * as cognito from './services/cognito';
import { configure } from '../src';
import config from './config.yml';
import * as demo from './demo-utils';

configure(config);

const state = { cognito: cognito.reducer };
const store = demo.initializeStore(state);

const container = $('#actions');
const services = { cognito };
demo.createActionSelect(services, container);

demo.eventHandlers(services, store);
demo.monitorState($('#current-state'), store);
