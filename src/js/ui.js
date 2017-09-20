import { createObjectUrl} from './utils/uint8array';
import { uncompress } from './utils/buffer';

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

function listFiles(files) {
  files.forEach(newItemFile);
}

function showFile(file) {
  const { type, buffer } = file; 
  const content = uncompress(buffer);

  if (type.includes('video')) {
    createObjectUrl(content).then(url => {
      $('#preview .image').html(`<video src="${ url }" autoplay controls/>`)
    });
  } else if (type.includes('image')) {
    createObjectUrl(content).then(url => {
      $('#preview .image').html(`<img src="${ url }"/>`);
    });
  }
}

export {
  newItemFile,
  listFiles,
  showFile
}