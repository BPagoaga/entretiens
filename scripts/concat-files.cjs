const fs = require('fs');
const path = require('path');
const { promisify } = require('util'); //requires node 8.X
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const appendFile = promisify(fs.appendFile);

// Append all files in source directory
// The resulting file is generated in destination
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const directory = argv.directory;
const destination = argv.destination;
const exclude = argv.exclude ?? [];

if (directory && destination) {
  readdir(directory)
    .then((files) => {
      files
        .filter((file) => {
          return !exclude.includes(file);
        })
        .map((file) => {
          console.log('MAP (' + destination + ') > ' + path.join(directory, file));
          readFile(path.join(directory, file), 'utf8').then((data) => {
            //console.log('DATA:', data);
            const reg = /import.*/g;
            const newStr = data.replace(reg, '');
            appendFile(destination, newStr + '\n').catch((err) => {
              console.error('ERROR:', err);
            });
          });
        });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}
