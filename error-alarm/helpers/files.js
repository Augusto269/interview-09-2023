const fs = require('fs');
const basePath = './logData.txt';

const createOrWriteLog = (data) => {
  const dataToLog = data instanceof Array ? data : [data];
  const dataStringify = JSON.stringify(dataToLog, null, 2);
  fs.writeFileSync(basePath, dataStringify, (err) => {
    if (err) throw err;
  });
};

const readLogsFile = () => {
  if (!fs.existsSync(basePath)) {
    return;
  }
  return fs.readFileSync(basePath, 'utf8', (err, data) => {
    if (err) throw err;
    return data;
  });
};
module.exports = { createOrWriteLog, readLogsFile };
