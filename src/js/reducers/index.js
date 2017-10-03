import { combineReducers } from 'redux';
import repositories from './repositories';
import filesByRepository from './files';
import selectedRepository from './selectedRepository';

const rootReducer = combineReducers({
  repositories,
  selectedRepository,
  filesByRepository
})

export default rootReducer;