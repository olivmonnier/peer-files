import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import configureStore from './store/configureStore';
import Root from './components/Root';
import 'semantic-ui-css/semantic.css';

const store = configureStore();

render(<Root store={store}/>, document.querySelector('main'))