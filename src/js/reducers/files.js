import {
  ADD_FILES,
  DELETE_FILE,
  RECEIVE_FILES,
  SELECT_FILE
} from '../constants/actionTypes';

const files = (state = [], action) => {
  switch (action.type) {
    case ADD_FILES:
      const { files } = action;
      return state.concat(files);
    case DELETE_FILE:
      return state.filter(file => file.id != action.id);
    case RECEIVE_FILES:
      return action.files
    default:
      return state;
  }
}

export default function filesByRepository(state = {}, action) {
  switch(action.type) {
    case ADD_FILES:
      return addOrDeleteFiles(state, action)
    case DELETE_FILE:
      return addOrDeleteFiles(state, action)
    case RECEIVE_FILES:
      return receiveFiles(state, action)
    default:
      return state;
  }
}

function addOrDeleteFiles(state, action) {
  const { repositoryId } = action;
  return {
    ...state,
    [repositoryId]: files(state[repositoryId], action)
  }
}

function receiveFiles(state, action) {
  if (action.repository !== {}) {
    const { id } = action.repository;
    return {
      ...state,
      [id]: files(state[id], action)
    }
  } else {
    return {}
  }
}