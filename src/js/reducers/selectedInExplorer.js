import {
  SELECT_FILE,
  SELECT_REPOSITORY
} from '../constants/actionTypes.js';
import {
  FILE,
  REPOSITORY
} from '../constants/contentTypes.js';

export default function selectedInExplorer(state = {}, action) {
  switch(action.type) {
    case SELECT_FILE:
      return {
        typeContent: FILE,
        file: action.file
      }
    case SELECT_REPOSITORY:
      return {
        typeContent: REPOSITORY,
        repository: action.repository
      }
    default:
      return state;
  }
}