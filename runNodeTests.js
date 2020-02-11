import path from 'path';
import glob from 'glob'; //eslint-disable-line

process.argv.slice(2).forEach((filePattern) => {
  glob(filePattern, (er, files) => {
    if (er) throw er;
    files.forEach((file) => {
      require(path.resolve(process.cwd(), file)); //eslint-disable-line
    });
  });
});
