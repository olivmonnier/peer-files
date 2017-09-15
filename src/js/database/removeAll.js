import Promise from 'bluebird';
import getObjectStore from './getObjectStore';

export default function (db, table) {
  return new Promise((resolve, reject) => {
    const store = getObjectStore(db, table, 'readwrite');
    const request = store.clear();

    request.onerror = reject;
    request.onsuccess = resolve;
  })
}