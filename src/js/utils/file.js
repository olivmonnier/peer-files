import Promise from 'bluebird';

function readFile(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', reject);

    reader.readAsArrayBuffer(file)
  })
}

export {
  readFile
}