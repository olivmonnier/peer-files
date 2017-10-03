import {
  RECEIVE_FILES,
  SELECT_FILE
} from '../constants/ActionTypes';

const files = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FILES:
      return action.files
    default:
      return state;
  }
}

export default function filesByRepository(state = {}, action) {
  switch(action.type) {
    case RECEIVE_FILES:
      if (action.repository !== {}) {
        const { id } = action.repository;

        return {
          ...state,
          [id]: files(state[id], action)
        }
      } else {
        return {}
      }  
    default:
      return state;
  }
}