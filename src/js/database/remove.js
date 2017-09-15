import Promise from 'bluebird';
import getObjectStore from './getObjectStore';

export default function (db, table, id) {
  return new Promise((resolve, reject) => {
    const store = getObjectStore(db, table, 'readwrite');
    const request = store.delete(id);

    request.onerror = reject;
    request.onsuccess = resolve;
  })
}
