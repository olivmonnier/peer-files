import { open, get, getAll, save } from '../database';
import { compress, uncompress } from '../utils/buffer';

const database = open('LocalDb');

export default class FileStore {
  constructor() {
    this.files = this.loadFiles();
  }

  addFile(file) {
    const reader = new FileReader();
    const { name, type } = file;

    return new Promise((resolve, reject) => {
      reader.addEventListener('loadend', () => {
        const buffer = compress(reader.result);
        const newFile = { name, type, buffer };

        database
          .then(db => save(db, 'Resources', newFile))
          .then((id) => {
            const fileSaved = Object.assign({}, newFile, { id })

            this.files.then(files => files.push(fileSaved));

            return fileSaved;
          })
          .then(resolve)
      });

      reader.readAsArrayBuffer(file)
    })
  }

  addFiles(files) {
    let fs = Array.isArray(files) ? files : Array.from(files);

    return Promise.all(fs.map(this.addFile.bind(this)));
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

  loadFiles() {
    return database.then(db => getAll(db, 'Resources'));
  }
}