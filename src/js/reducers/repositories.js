import {
  ADD_REPOSITORY,
  DELETE_REPOSITORY,
  RECEIVE_REPOSITORIES
} from '../constants/actionTypes';

export default function repositories(state = [], action) {
  switch(action.type) {
    case ADD_REPOSITORY:
      const { repository } = action;

      return state.concat(repository)
    case DELETE_REPOSITORY:
      const { id } = action;

      return state.filter(repo => repo.id !== id);
    case RECEIVE_REPOSITORIES:
      const { repositories } = action;

      return state.concat(repositories)
    default: 
      return state;
  }
}