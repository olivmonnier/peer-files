import Reflux from 'reflux';
import orderBy from 'lodash/fp/orderBy';
import { open, get, getAll, save, remove } from '../database';

const database = open('LocalDb');

const RepositoryActions = Reflux.createActions([
  {'loadRepositories': { children: ['success', 'failed'] }},
  {'addRepository': { children: ['success', 'failed'] }}, 
  {'removeRepository': { children: ['success', 'failed'] }}, 
  'getRepository'
]);

RepositoryActions.loadRepositories.listen(function() {
  return database.then(db => getAll(db, 'Repositories'))
    .then(orderBy('name', 'asc'))
    .then(this.success)
    .catch(this.failed)
});

RepositoryActions.addRepository.listen(function(repo) {
  return database
    .then(db => save(db, 'Repositories', repo))
    .then(id => Object.assign({}, repo, { id }))
    .then(this.success)
    .catch(this.failed)
});

RepositoryActions.removeRepository.listen(function(id) {
  return database
    .then(db => remove(db, 'Repositories', id))
    .then(() => id)
    .then(this.success)
    .catch(this.failed)
})

export default RepositoryActions;