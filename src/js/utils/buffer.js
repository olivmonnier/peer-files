import pako from 'pako';

const { Deflate, Inflate } = pako;

function compress(buffer) {
  const deflate = new Deflate({ level: 9 });

  deflate.push(buffer, true);
  return deflate.result;
}

function uncompress(buffer) {
  const inflate = new Inflate({ level: 9 });

  inflate.push(buffer, true);
  return inflate.result;
}

export {
  compress,
  uncompress
}