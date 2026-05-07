// given a folder with models, export them in a file (commonly called public-api).

// arg1: path to the folder containing the models
// arg2: path to the export file

const path = require("path");
const fs = require("fs");

const [, , modelsDir, apiPath] = process.argv;
const stream = fs.createWriteStream(apiPath, { flags: "w" });
const exclude = ["index", ".gitkeep"];

stream.once("open", (fd) => {
  fs.readdirSync(modelsDir).forEach((file) => {
    const filename = path.parse(file).name;
    const extension = path.parse(file).ext;

    if (!extension) {
      return;
    }

    if (exclude.includes(filename)) {
      return;
    }

    const relative = path
      .relative(path.dirname(apiPath), path.join(modelsDir, filename))
      .split(path.sep)
      .join(path.posix.sep);
    stream.write(`export * from './${relative}';\n`);
  });
  stream.end();
});
