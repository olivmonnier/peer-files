import {
  ADD_REPOSITORY,
  RECEIVE_REPOSITORIES
} from '../constants/ActionTypes';

export default function repositories(state = [], action) {
  switch(action.type) {
    case ADD_REPOSITORY:
      const { repository } = action;

      return state.concat(repository)
    case RECEIVE_REPOSITORIES:
      const { repositories } = action;

      return state.concat(repositories)
    default: 
      return state;
  }
}