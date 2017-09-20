import { listFiles, showFile, newItemFile } from './ui';
import FileStore from './stores/FileStore';

const filesStore = new FileStore();
filesStore.files.then(listFiles)

$(document).on('change', '#inputFile', (event) => 
  filesStore.addFiles(event.target.files).then(res => res.forEach(newItemFile)));

$(document).on('click', '#listFiles .item', (event) => {
  let type;
  const $el = $(event.currentTarget);
  const id = $el.data('id');

  filesStore.getFile(id).then(showFile);
});