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
  const content = uncompress(buffer);

  if (type.includes('video')) {
    createObjectUrl(content)
      .then(url => {
        $('#primaryContent').html(renderVideo(id, name, url))
      });
  } else if (type.includes('image')) {
    createObjectUrl(content)
      .then(url => {
        $('#primaryContent').html(renderImage(id, name, url));
      });
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

function renderImage(id, name, url) {
  return `
    <div class="ui secondary menu">
      <div class="header item">${ name }</div>
      <div class="right menu">
        <a id="btRemoveFile" data-id="${ id }" class="ui icon item">
          <i class="trash icon"></i>
        </a>
      </div>
    </div>
    <div class="ui image">
      <img src="${ url }"/>
    </div>
  `
}

function renderVideo(id, name, url) {
  return `
    <div class="ui secondary menu">
      <div class="header item">${ name }</div>
      <div class="right menu">
        <a id="btRemoveFile" data-id="${ id }" class="ui icon item">
          <i class="trash icon"></i>
        </a>
      </div>
    </div>
    <div class="ui image">
      <video src="${ url }" autoplay controls/>
    </div>
  `
}

export {
  listFiles,
  newItemFile,
  showFile
}