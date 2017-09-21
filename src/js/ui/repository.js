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
  $('#primaryContent').html(`
    <div class="ui buttons">
      <label for="btInputFile" class="ui positive button">
        Add file
        <input type="file" id="btInputFile" data-id="${ id }" multiple style="display: none"/>
      </label>
      <div class="or"></div>
      <button id="btRemoveRepository" class="ui button">Remove repository</button>
    </div>
  `)
}

export {
  newItemRepository,
  listRepositories,
  showActionsRepository
}