import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import FileActions from './actions/FileActions';
import RepositoryActions from './actions/RepositoryActions';
import MainContainer from './components/MainContainer';
import 'semantic-ui-css/semantic.css';

RepositoryActions.loadRepositories();
FileActions.loadFiles();

render(<MainContainer />, document.querySelector('main'))