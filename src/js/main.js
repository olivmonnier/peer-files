import pako from 'pako';
import { addFiles, getAllFiles, getFile } from './files';
import { listFiles, showFile, addNewItemFile } from './ui';

listFiles();

$(document).on('change', '#inputFile', (event) => 
  addFiles(event.target.files).then(res => 
    res.forEach(r => addNewItemFile)));
$(document).on('click', '#listFiles .item', (event) => {
  const $el = $(event.currentTarget);
  const id = $el.data('id');

  getFile(id).then(res => showFile(res.buffer, res.type))
});