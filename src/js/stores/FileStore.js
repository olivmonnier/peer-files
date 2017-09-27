import Reflux from 'reflux';
import Promise from 'bluebird';
import orderBy from 'lodash/fp/orderBy';
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
  onAddFiles(files, repositoryId) {
    let fs = Array.isArray(files) ? files : Array.from(files);

    Promise.all(fs.map(file => Actions.addFile(file, repositoryId)))
      .then(Actions.addFiles.completed)
      .catch(Actions.addFiles.failed)
  }
  onAddFile(file, repositoryId) {
    let newFile, fileSaved;
    const { name, type } = file;

    return readFile(file)
      .then(data => {
        const buffer = compress(data);

        newFile = { name, type, buffer, repositoryId };
      })
      .then(() => database)
      .then(db => save(db, 'Resources', newFile))
      .then(id => {
        let newList = this.state.files;
        const fileSaved = Object.assign({}, newFile, { id });
        newList.push(fileSaved);

        this.setState({ files: newList });
      })
      .then(Actions.addFile.completed)
      .catch(Actions.addFile.failed)
  }

  onRemoveFile(id) {
    return database
      .then(db => remove(db, 'Resources', id))
      .then(() => {
        let listFiles = this.state.files.filter(file => file.id !== id)
        this.setState({ files: listFiles })
      })
      .then(Actions.removeFile.completed)
      .catch(Actions.removeFile.failed);
  }

  onRemoveFiles(repositoryId) {
    const files = this.getFilesInRepository(repositoryId)

    return Promise.all(files.map(file => Actions.removeFile(file.id)))
      .then(Actions.removeFiles.completed)
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

  loadFiles() {
    return database.then(db => getAll(db, 'Resources'))
      .then(orderBy('name', 'asc'))
      .then(files => this.setState({ files }));
  }
}

const fileStore = new FileStore();

export default fileStore;