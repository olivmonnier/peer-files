/*import Reflux from 'reflux';
import RefluxPromise from 'reflux-promise';
import Promise from 'bluebird';
import orderBy from 'lodash/fp/orderBy';
import { compress, uncompress } from '../utils/buffer';
import { readFile } from '../utils/file';
import { open, get, getAll, save, remove } from '../database';

const database = open('LocalDb');

Reflux.use(RefluxPromise(Promise));

const FileActions = Reflux.createActions([
  { 'loadFiles': { children: ['completed', 'failed'] }},
  { 'addFile': { children: ['completed', 'failed'] }}, 
  { 'addFiles': { children: ['completed', 'failed'] }},
  { 'removeFile': { children: ['completed', 'failed'] }}, 
  { 'removeFiles': { children: ['completed', 'failed'] }},
  'getFile',
  'getFiles', 
  'getFileContent', 
  'getFilesInRepository'
]);

FileActions.loadFiles.listen(function() {
  return database.then(db => getAll(db, 'Resources'))
    .then(orderBy('name', 'asc'))
    .then(this.completed)
    .catch(this.failed);
})

FileActions.addFiles.listen(function (files, repositoryId) {
  let fs = Array.isArray(files) ? files : Array.from(files);

  return Promise.all(fs.map(file => FileActions.addFile(file, repositoryId)))
    .then(this.completed)
    .catch(this.failed)
})

FileActions.addFile.listen(function (file, repositoryId) {
  let newFile, fileSaved;
  const { name, type } = file;

  return readFile(file)
    .then(data => {
      const buffer = compress(data);

      newFile = { name, type, buffer, repositoryId };
    })
    .then(() => database)
    .then(db => save(db, 'Resources', newFile))
    .then(id => Object.assign({}, newFile, { id }))
    .then(this.completed)
    .catch(this.failed)
})

FileActions.removeFile.listen(function (id) {
  return database
    .then(db => remove(db, 'Resources', id))
    .then(() => id)
    .then(this.completed)
    .catch(this.failed);
});

export default FileActions;*/

import {
  ADD_FILES,
  DELETE_FILE,
  RECEIVE_FILES,
  SELECT_FILE
} from '../constants/actionTypes';
import orderBy from 'lodash/fp/orderBy';
import { open, get, getAll, save, remove } from '../database';
import { readFile } from '../utils/file';
import { compress } from '../utils/buffer';

const database = open('LocalDb');

export function fetchFiles(repository) {
  return dispatch => {
    return database.then(db => getAll(db, 'Resources'))
      .then(orderBy('name', 'asc'))
      .then(files => files.filter(file => file.repositoryId == repository.id))
      .then(files => dispatch(receiveFiles(files, repository)))
  }
}

function receiveFiles(files, repository) {
  return {
    type: RECEIVE_FILES,
    repository,
    files
  }
}

export function selectFile(file) {
  return {
    type: SELECT_FILE,
    file
  }
}

export function addFiles(files, repositoryId) {
  let fs = Array.isArray(files) ? files : Array.from(files);

  return dispatch => {
    return Promise.all(fs.map(file => addFile(file, repositoryId)))
      .then(files => dispatch({
        type: ADD_FILES,
        repositoryId,
        files
      }))
  }
}

function addFile(file, repositoryId) {
  let newFile;
  const { name, type } = file;

  return readFile(file)
    .then(data => {
      const buffer = compress(data);

      newFile = { name, type, buffer, repositoryId };
    })
    .then(() => database)
    .then(db => save(db, 'Resources', newFile))
    .then(id => Object.assign({}, newFile, { id }))
}

export function removeFile(id, repositoryId) {
  return dispatch => {
    return database
      .then(db => remove(db, 'Resources', id))
      .then(() => dispatch({
        type: DELETE_FILE,
        repositoryId,
        id
      }))
  }
}