import { h } from 'preact/src/h';
import { render } from 'preact/src/render';
import RepositoryActions from '../components/RepositoryActions';

function listRepositories(repositories) {
  repositories.forEach(newItemRepository);
}

function newItemRepository(repository) {
  $('#listFiles').append(renderItemRepository(repository));
}

function renderItemRepository(repository) {
  const { id, name } = repository;

  return `
    <a class="item" data-id="${ id }" data-type="repository">
      <i class="folder icon"></i>
      <div class="content">
        <div class="header">${ name }</div>        
        <div class="list"></div>
      </div>
    </a>
  `
}

function showActionsRepository(id) {
  render(<RepositoryActions id={id} />, document.querySelector('#primaryContent'));
}

export {
  newItemRepository,
  listRepositories,
  showActionsRepository
}