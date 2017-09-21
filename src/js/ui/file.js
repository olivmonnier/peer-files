import { createObjectUrl } from '../utils/uint8array';
import { uncompress } from '../utils/buffer';

function listFiles(files, repositoryEl = $('#listFiles')) {
  files.forEach(file => newItemFile(file, repositoryEl));
}

function newItemFile(file, repositoryEl) {
  repositoryEl.append(renderItemFile(file));
}

function renderItemFile(file) {
  const { id, name } = file;

  return `
    <a class="item" data-id="${ file.id}" data-type="file">
      <i class="file icon"></i>
      <div class="content">
        <div class="header">${ file.name}</div>
      </div>
    </a>
  `
}

function showFile(file) {
  const { type, buffer } = file;
  const content = uncompress(buffer);

  if (type.includes('video')) {
    createObjectUrl(content)
      .then(url => {
        $('#primaryContent').html(renderVideo(url))
      });
  } else if (type.includes('image')) {
    createObjectUrl(content)
      .then(url => {
        $('#primaryContent').html(renderImage(url));
      });
  }
}

function renderImage(url) {
  return `
    <div class="ui image">
      <img src="${url}"/>
    </div>
  `
}

function renderVideo(url) {
  return `
    <div class="ui image">
      <video src="${url}" autoplay controls/>
    </div>
  `
}

export {
  listFiles,
  newItemFile,
  showFile
}