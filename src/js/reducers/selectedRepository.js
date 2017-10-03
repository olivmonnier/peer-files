import {
  SELECT_REPOSITORY
} from '../constants/ActionTypes';

export default function selectedRepository(state = {}, action) {
  switch(action.type) {
    case SELECT_REPOSITORY:
      return action.repository;
    default: 
      return state;
  }
}