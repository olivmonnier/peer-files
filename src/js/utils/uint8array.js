import blobUtil from 'blob-util/dist/blob-util';
const { arrayBufferToBlob, createObjectURL } = blobUtil;

function createObjectUrl (uint8array, type) {
  return arrayBufferToBlob(uint8array.buffer, type)
    .then(createObjectURL)
}

export {
  createObjectUrl
}