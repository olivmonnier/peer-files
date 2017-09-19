
import pako from 'pako';
import { open, get, getAll, save } from './database';

const { Deflate, Inflate } = pako;
const database = open('LocalDb');

function compress(buffer) {
  const deflate = new Deflate({ level: 9 });

  deflate.push(buffer, true);
  return deflate.result;
}

function uncompress(buffer) {
  const inflate = new Inflate({ level: 9 });

  inflate.push(buffer, true);
  return inflate.result;
}

function addFiles(files) {
  let fs = Array.isArray(files) ? files : Array.from(files);

  return Promise.all(fs.map(addFile));
}

function addFile(file) {
  const reader = new FileReader();
  const { name, type } = file;

  return new Promise((resolve, reject) => {
    reader.addEventListener('loadend', () => {
      const buffer = compress(reader.result);

      database
        .then(db => save(db, 'Resources', { name, type, buffer }))
        .then(resolve);
    });

    reader.readAsArrayBuffer(file)
  })
}

function getFile(search) {
  let file;

  return database
    .then(db => get(db, 'Resources', search))
    .then(res => {
      if (res) {
        file = res;
        res.buffer = uncompress(res.buffer);

        return res;
      }
    });
}

function getAllFiles() {
  return database.then(db => getAll(db, 'Resources'))
}

export {
  addFiles,
  compress,
  uncompress,
  getAllFiles,
  getFile
}