import Promise from 'bluebird';
import Reflux from 'reflux';
import orderBy from 'lodash/fp/orderBy';
import { open, get, getAll, save, remove } from '../database';
import { compress, uncompress } from '../utils/buffer';
import { readFile } from '../utils/file';

const database = open('LocalDb');

const Actions = Reflux.createActions(['addFile', 'addFiles', 'getFile', 'getFiles', 'getFileContent', 'getFilesInRepository', 'removeFile'])

export class FileStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      files: []
    }
    this.listenToMany(Actions);
  }
  addFile(file, repositoryId) {
    let newFile, fileSaved;
    const { name, type } = file;

    return readFile(file)
      .then(data => {
        const buffer = compress(data);

        newFile = { name, type, buffer, repositoryId };       
      })
      .then(() => database)
      .then(db => save(db, 'Resources', newFile))
      .then(id => fileSaved = Object.assign({}, newFile, { id }))
      .then(() => this.state.files)
      .then(files => {
        let newFiles = files;
        newFiles.push(fileSaved)
        return newFiles;
      })
      .then(() => fileSaved);
  }

  addFiles(files, repositoryId) {
    let fs = Array.isArray(files) ? files : Array.from(files);

    return Promise.all(fs.map(file => this.addFile(file, repositoryId)));
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

  removeFile(id) {
    return database
      .then(db => remove(db, 'Resources', id))
      .then(() => this.state.files)
      .then(files => {
        let listFiles = files.filter(file => file.id == id)
        this.setState({ files: listFiles })
      });
  }
}

const fileStore = new FileStore();

export default fileStore;