import { h } from 'preact/src/h';
import { render } from 'preact/src/render';
import PreviewVideo from '../components/PreviewVideo';
import PreviewImage from '../components/PreviewImage';
import { createObjectUrl } from '../utils/uint8array';
import { uncompress } from '../utils/buffer';

function listFiles(files, repositoryEl = $('#listFiles')) {
  files.forEach(file => newItemFile(file, repositoryEl));
}

function newItemFile(file, repositoryEl) {
  const { id, name } = file;

  repositoryEl.append(renderItemFile(id, name));
}

function showFile(file) {
  const { id, name, type, buffer } = file;
  
  $('#primaryContent').empty();

  if (type.includes('video')) {
    render(<PreviewVideo {...file} />, document.querySelector('#primaryContent'));
  } else if (type.includes('image')) {
    render(<PreviewImage {...file} />, document.querySelector('#primaryContent'));
  }
}

function renderItemFile(id, name) {
  return `
    <a class="item" data-id="${ id }" data-type="file">
      <i class="file icon"></i>
      <div class="content">
        <div class="header">${ name }</div>
      </div>
    </a>
  `
}

export {
  listFiles,
  newItemFile,
  showFile
}