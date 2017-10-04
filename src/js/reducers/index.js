import { combineReducers } from 'redux';
import repositories from './repositories';
import filesByRepository from './files';
import selectedInExplorer from './selectedInExplorer';

const rootReducer = combineReducers({
  filesByRepository,
  repositories,
  selectedInExplorer
})

export default rootReducer;