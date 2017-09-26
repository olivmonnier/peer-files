import { open, get, getAll, save } from '../database';
import { autorun, observable, action, computed } from 'mobx';

const database = open('LocalDb');

export class RepositoryStore {
  @observable repositories = [];

  addRepository(repo) {
    return database
      .then(db => save(db, 'Repositories', repo))
      .then(id => {
        const repoSaved = Object.assign({}, repo, { id });

        this.repositories.push(repoSaved);

        return repoSaved;
      })
  }

  getRepository(id) {
    const repo = this.repositories.filter(repo => repo.id == id);

    if (repo.length >= 0) return repo[0]; 
  }
  
  @action loadRepositories() {
    return database.then(db => getAll(db, 'Repositories'))
      .then(repos => {
        this.repositories = repos
      })
  }
}

const repositoryStore = new RepositoryStore();

export default repositoryStore;