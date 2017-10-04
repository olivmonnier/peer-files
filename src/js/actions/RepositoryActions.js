import orderBy from 'lodash/fp/orderBy';
import { 
  ADD_REPOSITORY, 
  DELETE_REPOSITORY, 
  EDIT_REPOSITORY, 
  RECEIVE_REPOSITORIES, 
  SELECT_REPOSITORY
} from '../constants/actionTypes';
import { open, get, getAll, save, remove } from '../database';

const database = open('LocalDb');

export function fetchRepositories() {
  return dispatch => {
    return database.then(db => getAll(db, 'Repositories'))
      .then(orderBy('name', 'asc'))
      .then(repos => dispatch(receiveRepositories(repos)))
  }
}

function receiveRepositories(repositories) {
  return {
    type: RECEIVE_REPOSITORIES,
    repositories
  }
}

export function selectRepository(repository) {
  return {
    type: SELECT_REPOSITORY,
    repository
  }
}

export function addRepository(newRepository) {
  return dispatch => {
    return database.then(db => save(db, 'Repositories', newRepository))
      .then(id => Object.assign({}, newRepository, { id }))
      .then(repository => dispatch({
        type: ADD_REPOSITORY,
        repository
      }))
  }
}

export function removeRepository(id) {
  return dispatch => {
    return database
      .then(db => remove(db, 'Repositories', id))
      .then(() => dispatch({
        type: DELETE_REPOSITORY,
        id
      }))
  }
}