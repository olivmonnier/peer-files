import pako from 'pako';
import { createObjectUrl } from './uint8array-utils';
import { open, get } from './database';
import { add } from './files';

const { Inflate } = pako;
const $ = (selector) => document.querySelectorAll(selector);
const inputFile = $('#inputFile');
const img = $('#img');
const video = $('#video');
const database = open('LocalDb');

database
  .then(db => get(db, 'Resources', 1))
  .then(res => {
    if (res) {
      const inflate = new Inflate({ level: 9 });
  
      inflate.push(res.buffer, true);
  
      const uncompressed = inflate.result;
  
      return { type: res.type, url: createObjectUrl(uncompressed, res.type) };
    }
  })
  .then(media => {
    console.log(media)
    if(media.type.indexOf('video') > -1) {
      video[0].src = media.url
    } else if(media.type.match(/image/)) {
      img[0].src = media.url
    }
  });

inputFile[0].addEventListener('change', (event) =>
  add(database, event.target.files));