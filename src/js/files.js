
import pako from 'pako';
const { Deflate } = pako;

function add(files) {
  let fs = Array.isArray(files) ? files : Array.from(files);

  fs.forEach(file => {
    const reader = new FileReader();
    const { name, type } = file;

    reader.addEventListener('loadend', () => {
      const result = reader.result
      const deflate = new Deflate({ level: 9 });

      deflate.push(reader.result, true);
      const buffer = deflate.result;

      database.then(db =>
        save(db, 'Resources', { name, type, buffer }));
    });

    reader.readAsArrayBuffer(file)
  })
}

export {
  add
}