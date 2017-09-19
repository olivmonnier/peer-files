import { createObjectUrl} from './uint8array-utils';
import { addFiles, getAllFiles, getFile } from './files';

const img = $('#img');
const video = $('#video');
const listFilesContainer = $('#listFiles');

function newItemFile(file) {
  listFilesContainer.append(`
    <a class="item" data-id="${ file.id}">
      <i class="file icon"></i>
      <div class="content">
        <div class="header">${ file.name}</div>
      </div>
    </a>
  `)
}

function addNewItemFile(id) {
  getFile(id).then(newItemFile);
}

function listFiles() {
  getAllFiles().then(files => 
    files.forEach(newItemFile));
}

function showFile(data, type) {
  if (type.includes('video')) {
    createObjectUrl(data).then(url => {
      $('#preview .image').html(`<video src="${url}" autoplay controls/>`)
    });
  } else if (type.includes('image')) {
    createObjectUrl(data).then(url => {
      $('#preview .image').html(`<img src="${url}"/>`);
    });
  }
}

export {
  addNewItemFile,
  listFiles,
  showFile
}