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

export function removeFiles(files) {
  return dispatch => {
    return Promise.all(files.map(file => {
      const { id, repositoryId } = file;
      return dispatch(removeFile(id, repositoryId))
    }))
  }
}