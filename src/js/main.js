import orderBy  from 'lodash/fp/orderBy';
import { listFiles, showFile, newItemFile } from './ui/file';
import { listRepositories, newItemRepository, showActionsRepository } from './ui/repository';
import FileStore from './stores/FileStore';
import RepositoryStore from './stores/RepositoryStore';

const repositoryStore = new RepositoryStore();
const fileStore = new FileStore();

repositoryStore.repositories
  .then(repos => orderBy('name', 'asc')(repos))
  .then(listRepositories)

$(document).on('click', '#newRepository', (event) => {
  $('#newRepositoryModal')
    .modal({
      blurring: true,
      onApprove: () => {
        const name = $('input[name="repository-name"]').val();

        repositoryStore.addRepository({ name }).then(newItemRepository);
      }
    })
    .modal('show');
});

$(document).on('change', '#inputFile', (event) => {
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