import Reflux from 'reflux';
import RefluxPromise from 'reflux-promise';
import Promise from 'bluebird';
import orderBy from 'lodash/fp/orderBy';
import { open, get, getAll, save, remove } from '../database';

const database = open('LocalDb');

Reflux.use(RefluxPromise(Promise));

const RepositoryActions = Reflux.createActions([
  {'loadRepositories': { children: ['completed', 'failed'] }},
  {'addRepository': { children: ['completed', 'failed'] }}, 
  {'removeRepository': { children: ['completed', 'failed'] }}, 
  'getRepository'
]);

RepositoryActions.loadRepositories.listen(function() {
  return database.then(db => getAll(db, 'Repositories'))
    .then(orderBy('name', 'asc'))
    .then(this.completed)
    .catch(this.failed)
});

RepositoryActions.addRepository.listen(function(repo) {
  return database
    .then(db => save(db, 'Repositories', repo))
    .then(id => Object.assign({}, repo, { id }))
    .then(this.completed)
    .catch(this.failed)
});

RepositoryActions.removeRepository.listen(function(id) {
  return database
    .then(db => remove(db, 'Repositories', id))
    .then(() => id)
    .then(this.completed)
    .catch(this.failed)
})

export default RepositoryActions;