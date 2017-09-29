import Reflux from 'reflux';

import Promise from 'bluebird';
import orderBy from 'lodash/fp/orderBy';
import { compress, uncompress } from '../utils/buffer';
import { readFile } from '../utils/file';

import { open, get, getAll, save, remove } from '../database';

const database = open('LocalDb');


const FileActions = Reflux.createActions([
  { 'loadFiles': { children: ['success', 'failed'] }},
  { 'addFile': { children: ['success', 'failed'] }}, 
  { 'addFiles': { children: ['success', 'failed'] }},
  { 'removeFile': { children: ['success', 'failed'] }}, 
  { 'removeFiles': { children: ['success', 'failed'] }},
  'getFile',
  'getFiles', 
  'getFileContent', 
  'getFilesInRepository'
]);

FileActions.loadFiles.listen(function() {
  return database.then(db => getAll(db, 'Resources'))
    .then(orderBy('name', 'asc'))
    .then(this.success)
    .catch(this.failed);
})

FileActions.addFiles.listen(function (files, repositoryId) {
  let fs = Array.isArray(files) ? files : Array.from(files);

  return Promise.all(fs.map(file => FileActions.addFile(file, repositoryId)))
    .then(this.success)
    .catch(this.failed)
})

FileActions.addFile.listen(function (file, repositoryId) {
  let newFile, fileSaved;
  const { name, type } = file;

  return readFile(file)
    .then(data => {
      const buffer = compress(data);

      newFile = { name, type, buffer, repositoryId };
    })
    .then(() => database)
    .then(db => save(db, 'Resources', newFile))
    .then(id => Object.assign({}, newFile, { id }))
    .then(this.success)
    .catch(this.failed)
})

FileActions.removeFile.listen(function (id) {
  return database
    .then(db => remove(db, 'Resources', id))
    .then(() => id)
    .then(this.success)
    .catch(this.failed);
});

export default FileActions;