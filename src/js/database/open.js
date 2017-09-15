
import Promise from 'bluebird';

const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
  IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
  dbVersion = 1.0;

export default function (basename) {
  if (!indexedDB) {
    return new Error('Your browser doesn\'t support IndexedDB')
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(basename, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      const reposStore = db.createObjectStore('Repositories', { keyPath: 'id', autoIncrement: true })
      reposStore.createIndex('name', 'name', { unique: true });

      const resourcesStore = db.createObjectStore('Resources', { keyPath: 'id', autoIncrement: true });
      resourcesStore.createIndex('name', 'name', { unique: false });
      resourcesStore.createIndex('repositoryId', 'repositoryId', { unique: false });
    }

    request.onerror = reject;
    request.onsuccess = (event) => {
      console.log("Success creating/accessing IndexedDB database");

      const db = request.result;

      if (db.setVersion) {
        if (db.version !== dbVersion) {
          db.setVersion(dbVersion);
        }
      }

      resolve(db);
    }
  })
}