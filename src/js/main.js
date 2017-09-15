import pako from 'pako';
import { createObjectUrl } from './uint8array-utils';
import { open, save, get } from './database';

const { Deflate, Inflate } = pako;
const $ = (selector) => document.querySelectorAll(selector);
const inputFile = $('#inputFile');
const img = $('#img');
const database = open('LocalDb');

database
  .then(db => get(db, 'Resources', 1))
  .then(res => {
    const inflate = new Inflate({ level: 9 });

    inflate.push(res.buffer, true);

    const uncompressed = inflate.result;

    return createObjectUrl(uncompressed, res.type);
  })
  .then(url => img[0].src = url);

inputFile[0].addEventListener('change', (event) => {
  const files = Array.from(event.target.files);

  files.forEach(file => {
    const reader = new FileReader();

    reader.addEventListener('loadend', () => {
      const result = reader.result
      const deflate = new Deflate({ level: 9 });     

      deflate.push(reader.result, true);
      const compressed = deflate.result;      

      database.then(db => save(db, 'Resources', {
        name: file.name,
        type: file.type,
        buffer: compressed
      }));
    });

    reader.readAsArrayBuffer(file)
  })
});