import Reflux from 'reflux';
import Promise from 'bluebird';
import { compress, uncompress } from '../utils/buffer';
import { readFile } from '../utils/file';
import Actions from '../actions/FileActions';

import { open, get, getAll, save, remove } from '../database';

const database = open('LocalDb');

export class FileStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      files: []
    }
    this.listenables = Actions;
  }

  onAddFileSuccess(newFile) {
    let newList = this.state.files;
    newList.push(newFile);
    this.setState({ files: newList });
  }

  onRemoveFileSuccess(id) {
    let listFiles = this.state.files.filter(file => file.id !== id)
    this.setState({ files: listFiles })
  }

  onRemoveFiles(repositoryId) {
    const files = this.getFilesInRepository(repositoryId)

    return Promise.all(files.map(file => Actions.removeFile(file.id)))
      .then(Actions.removeFiles.success)
      .catch(Actions.removeFiles.failed);
  }

  getFile(id) {
    const file = this.state.files.filter(file => file.id == id);

    if (file.length >= 0) return file[0]
  }

  getFiles() {
    return this.state.files;
  }

  getFileContent(id) {
    const file = this.getFile(id);

    return uncompress(file.buffer);
  }

  getFilesInRepository(repositoryId) {
    return this.state.files.filter(file => file.repositoryId == repositoryId);
  }

  onLoadFilesSuccess(files) {
    this.setState({ files });
  }
}

const fileStore = new FileStore();

export default fileStore;