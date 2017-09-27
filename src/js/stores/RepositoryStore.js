import Reflux from 'reflux';
import orderBy from 'lodash/fp/orderBy';
import { open, get, getAll, save, remove } from '../database';
import Actions from '../actions/RepositoryActions';

const database = open('LocalDb');

export class RepositoryStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      repositories: []
    }
    this.listenToMany(Actions);
  }
  addRepository(repo) {
    return database
      .then(db => save(db, 'Repositories', repo))
      .then(id => {
        let repositories = this.state.repositories;
        const repoSaved = Object.assign({}, repo, { id });

        repositories.push(repoSaved);
        this.setState({ repositories });

        return repoSaved;
      })
  }

  getRepository(id) {
    const repo = this.state.repositories.filter(repo => repo.id == id);

    if (repo.length >= 0) return repo[0]; 
  }

  removeRepository(id) {
    return database
      .then(db => remove(db, 'Repositories', id))
      .then(() => {
        let listRepos = this.state.repositories.filter(repos => repos.id !== id)
        this.setState({ repositories: listRepos })
      })
  }
  
  loadRepositories() {
    return database.then(db => getAll(db, 'Repositories'))
      .then(orderBy('name', 'asc'))
      .then(repos => this.setState({ repositories: repos }))
  }
}

const repositoryStore = new RepositoryStore();

export default repositoryStore;