import { open, get, getAll, save } from '../database';
import { compress, uncompress } from '../utils/buffer';
import { readFile } from '../utils/file';
import Promise from 'bluebird';

const database = open('LocalDb');
export default class FileStore {
  constructor() {
    this.files = this.loadFiles();
  }

  addFile(file, repositoryId) {
    let newFile;
    const reader = new FileReader();
    const { name, type } = file;

    return readFile(file)
      .then(data => {
        const buffer = compress(data);

        newFile = { name, type, buffer, repositoryId };

        return database;         
      })
      .then(db => save(db, 'Resources', newFile))
      .then(id => {
        const fileSaved = Object.assign({}, newFile, { id })

        this.files.then(files => files.push(fileSaved));

        return fileSaved;
      })
  }

  addFiles(files, repositoryId) {
    let fs = Array.isArray(files) ? files : Array.from(files);

    return Promise.all(fs.map(file => this.addFile(file, repositoryId)));
  }

  getFile(id) {
    return this.files.then(files => {
      const file = files.filter(file => file.id == id);

      if (file.length >= 0) return file[0]
    });
  }

  getFileContent(id) {
    const file = this.getFile(id);

    return file.then(file => uncompress(file.buffer));
  }

  getFilesInRepository(repositoryId) {
    return this.files.then(files => 
      files.filter(file => file.repositoryId == repositoryId));
  }

  loadFiles() {
    return database.then(db => getAll(db, 'Resources'));
  }
}