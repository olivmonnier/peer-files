export default function (db, table, mode = 'readonly') {
  const tx = db.transaction(table, mode);

  return tx.objectStore(table);
}