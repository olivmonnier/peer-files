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
    this.listenables = Actions;
  }

  onLoadRepositoriesSuccess(repositories) {
    this.setState({ repositories })
  }

  onAddRepositorySuccess(newRepo) {
    let newList = this.state.repositories;
    newList.push(newRepo);
    this.setState({ repositories: newList });
  }

  onRemoveRepositorySuccess(id) {
    let listRepos = this.state.repositories.filter(repos => repos.id !== id)
    this.setState({ repositories: listRepos })
  }

  getRepository(id) {
    const repo = this.state.repositories.filter(repo => repo.id == id);

    if (repo.length >= 0) return repo[0];
  }
}

const repositoryStore = new RepositoryStore();

export default repositoryStore;