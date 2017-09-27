import Reflux from 'reflux';

const FileActions = Reflux.createActions([
  { 'addFile': { children: ['completed', 'failed'] }}, 
  { 'addFiles': { children: ['completed', 'failed'] }},
  { 'removeFile': { children: ['completed', 'failed'] }}, 
  { 'removeFiles': { children: ['completed', 'failed'] }},
  'getFile',
  'getFiles', 
  'getFileContent', 
  'getFilesInRepository'
]);

export default FileActions;