import get from './get';
import getObjectStore from './getObjectStore';

export default function (db, table, data) {
  return new Promise((resolve, reject) => {
    const store = getObjectStore(db, table, 'readwrite');
    const request = data.id
      ? store.put(data)
      : store.add(data);

    request.onerror = reject;
    request.onsuccess = (event) => resolve(event.target.result);
  })
}