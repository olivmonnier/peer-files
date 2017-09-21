function listRepositories(repositories) {
  repositories.forEach(newItemRepository);
}

function newItemRepository(repository) {
  $('#listFiles').append(renderItemRepository(repository));
}

function renderItemRepository(repository) {
  const { id, name } = repository;

  return `
    <a class="item" data-id="${ id}" data-type="repository">
      <i class="folder icon"></i>
      <div class="content">
        <div class="header">${ name}</div>        
        <div class="list"></div>
      </div>
    </a>
  `
}

function showActionsRepository(id) {
  $('#primaryContent').html(`
    <div class="ui buttons">
      <label for="inputFile" class="ui icon button">
        <i class="file icon"></i>
        Add file
      </label>
      <input type="file" id="inputFile" data-id="${id}" multiple style="display: none"/>
    </div>
  `)
}

export {
  newItemRepository,
  listRepositories,
  showActionsRepository
}