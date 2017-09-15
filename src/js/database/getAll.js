import Promise from 'bluebird';
import getObjectStore from './getObjectStore';


export default function (db, table) {
  return new Promise((resolve, reject) => {
    let data = [];
    const store = getObjectStore(db, table);
    const cursor = store.openCursor();

    cursor.onerror = reject;
    cursor.onsuccess = (event) => {
      let result = event.target.result;

      if (result && result !== null) {
        data.push(result.value);
        result.continue();
      } else {
        resolve(data);
      }
    }
  })
}