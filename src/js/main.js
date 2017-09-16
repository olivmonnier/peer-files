import pako from 'pako';
import { createObjectUrl } from './uint8array-utils';
import { open, get } from './database';
import { add } from './files';

const { Inflate } = pako;
const $ = (selector) => document.querySelectorAll(selector);
const inputFile = $('#inputFile');
const img = $('#img');
const database = open('LocalDb');

database
  .then(db => get(db, 'Resources', 1))
  .then(res => {
    if (res) {
      const inflate = new Inflate({ level: 9 });
  
      inflate.push(res.buffer, true);
  
      const uncompressed = inflate.result;
  
      return createObjectUrl(uncompressed, res.type);
    }
  })
  .then(url => img[0].src = url);

inputFile[0].addEventListener('change', (event) =>
  add(database, event.target.files));