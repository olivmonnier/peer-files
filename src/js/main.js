import { h } from 'preact/src/h';
import { render } from 'preact/src/render';
import MainContainer from './components/MainContainer';
import fileStore from './stores/FileStore';
import repositoryStore from './stores/RepositoryStore';

const props = { 
  repositories: repositoryStore.getRepositories(), 
  files: fileStore.getFiles()
}
render(<MainContainer {...props} />, document.body)

$(document).on('click', '#btNewRepository', (event) => {
  $('#newRepositoryModal')
    .modal({
      blurring: true,
      onApprove: () => {
        const name = $('input[name="repository-name"]').val();

        repositoryStore.addRepository({ name });
      }
    })
    .modal('show');
});
/*
$(document).on('change', '#btInputFile', (event) => {
  const $el = $(event.currentTarget);
  const repositoryId = $el.data('id');
  const repositoryEl = $(`#listFiles .item[data-type="repository"][data-id="${repositoryId}"] .list`);

  $('#primaryContent').addClass('loading');

  fileStore.addFiles(event.target.files, repositoryId)
    .then(res => res.forEach(r => newItemFile(r, repositoryEl)))
    .then(() => $('#primaryContent').removeClass('loading'))
});

$(document).on('click', '#listFiles .item[data-type="file"]', (event) => {
  event.stopPropagation();

  const $el = $(event.currentTarget);
  const id = $el.data('id');

  fileStore.getFile(id).then(showFile);
});

$(document).on('click', '#listFiles .item[data-type="repository"]', (event) => {
  const $el = $(event.currentTarget);
  const id = $el.data('id');
  const $listFiles = $el.find('.list')
  const isOpened = $el.find('i.folder').hasClass('open');

  $el.find('i.folder').toggleClass('open');

  showActionsRepository(id);

  if (isOpened) return $listFiles.empty();

  fileStore.getFilesInRepository(id)
    .then(files => files.forEach(file => newItemFile(file, $listFiles))); 
});

$(document).on('click', '#btRemoveFile', (event) => {
  const $el = $(event.currentTarget);
  const id = $el.data('id');

  fileStore.removeFile(id)
    .then(() => $(`#listFiles .item[data-type="file"][data-id="${id}"]`).remove())
})*/