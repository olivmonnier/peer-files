import { open, get, getAll, save } from '../database';

const database = open('LocalDb');

class RepositoryStore {
  constructor() {
    this.repositories = this.loadRepositories();
  }

  addRepository(repo) {
    return database
      .then(db => save(db, 'Repositories', repo))
      .then(id => {
        const repoSaved = Object.assign({}, repo, { id });

        this.repositories.then(repos => repos.push(repoSaved));

        return repoSaved;
      })
  }

  getRepository(id) {
    return this.repositories
      .then(repos => {
        const repo = repos.filter(repo => repo.id == id);

        if (repo.length >= 0) return repo[0];
      })
  }

  getRepositories() {
    return this.repositories;
  }
  
  loadRepositories() {
    return database.then(db => getAll(db, 'Repositories'))
  }
}

const repositoryStore = new RepositoryStore();

export default repositoryStore;